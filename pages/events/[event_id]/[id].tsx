import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";

export default function GenericID({ paramEvent }: any) {
  const email = useRef<HTMLInputElement>(null);
  const router = useRouter();
  let [registeredMessage, setRegisteredMessage] = useState<string>("");

  const register = async (e: any) => {
    console.log(router.query);
    console.log(email.current?.value);
    e.preventDefault();
    try {
      const { eventId, id } = router.query;
      const response = await fetch("/api/email-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.current!.value, eventId: id }),
      });

      if (!response.ok) throw new Error("Error -> " + response.status);
      const { message } = await response.json();
      setRegisteredMessage(message);
      console.log(registeredMessage);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="event_single_page">
      <h1>Events In {paramEvent[0].city.toUpperCase()}</h1>

      <div className="content">
        {paramEvent.map((event: any) => (
          <div key={event.id} className="event_single_page">
            <Link key={event.id} href={`/events/${event.city}/${event.id}`}>
              <Image height={500} width={1000} alt="IMG" src={event.image} />
              <h2>{event.title}</h2>
              <p>{event.description}</p>
            </Link>
            <form onSubmit={(e) => register(e)} className="email_registration">
              <label>Get Register</label>
              <input ref={email} type="email" />
              <input type="submit" name="Submit" />
            </form>
          </div>
        ))}
      </div>
      <h1>{registeredMessage}</h1>
    </div>
  );
}

export async function getStaticPaths() {
  const data = await import("../../../data.json");
  const paths = data.allEvents.map((event) => {
    return {
      params: {
        event_id: event.city,
        id: event.id,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const data = await import("../../../data.json");
  const events = data.allEvents;
  const param = context.params.id;
  const paramEvent = events.filter((event) => event.id === param);

  console.log(context);
  return {
    props: {
      paramEvent,
    },
  };
}
