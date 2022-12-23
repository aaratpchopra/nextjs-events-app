import Image from "next/image";
import Link from "next/link";

export default function EventID({ events }: any) {
  return (
    <div className="cat_events">
      <h1>Events In {events[0].city.toUpperCase()}</h1>
      <br />
      {events.map((event: any) => (
        <Link
          key={event.id}
          href={`/events/${event.city}/${event.id}`}
          passHref={true}
        >
          <Image height={100} width={250} alt="IMG" src={event.image} />
          <h2>{event.title}</h2>
          <p>{event.description}</p>
        </Link>
      ))}
    </div>
  );
}

export async function getStaticPaths() {
  const data = await import("../../../data.json");
  const paths = data.events_categories.map((event) => {
    return {
      params: {
        event_id: event.id,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context: any) {
  const param = context.params.event_id;
  const data = await import("../../../data.json");
  const paramEvents = data.allEvents.filter((event) => event.city === param);

  return {
    props: {
      events: paramEvents,
    },
  };
}
