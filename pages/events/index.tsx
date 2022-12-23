import Image from "next/image";
import Link from "next/link";

export default function Events({ event_category }: any) {
  return (
    <div className="events_page">
      {event_category.map((category: any) => (
        <Link
          key={category.id}
          href={`/events/${category.id}`}
          passHref={true}
          className="card"
        >
          <Image height={100} width={250} alt="IMG" src={category.image} />
          <h1>{category.title}</h1>
        </Link>
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const data = await import("../../data.json");

  return {
    props: {
      event_category: data.events_categories,
    },
  };
}
