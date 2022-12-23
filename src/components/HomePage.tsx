import Link from "next/link";
import Image from "next/image";

export default function HomePage({ event_category }: any) {
  return (
    <div className="home_body">
      <main>
        <div>
          {event_category.map((category: any) => (
            <Link
              key={category.id}
              href={`/events/${category.id}`}
              passHref={true}
              className="card"
            >
              <div className="image">
                <Image
                  height={100}
                  width={250}
                  alt="IMG"
                  src={category.image}
                />
              </div>
              <div className="content">
                <h1>{category.title}</h1>
                <p>{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
