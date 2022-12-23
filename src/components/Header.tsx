import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Image width={50} height={50} alt="LOGO" src={"/images/icon.png"} />
      <div className="topNav">
        <nav>
          <img src="" alt="" />
          <ul>
            <li>
              <Link href="/" passHref={true}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/events" passHref={true}>
                Events
              </Link>
            </li>
            <li>
              <Link href="/about-us" passHref={true}>
                About Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <p className="title"> Sed ut perspiciatis unde omnis</p>
    </header>
  );
}
