import Image from "next/image";
import Link from "next/link";
import React from "react";
import image from "../../public/images/otomat logo-black-on-white.png";
import Header from "../Header2";

export default function BlogTitle() {
  return (
    <header className="header">
      <nav className="nav container">
        <div></div>
        <div className="nav__logo-container2">
          <Link href={`/`} legacyBehavior>
            {image && (
              <Image
                src={image}
                alt=""
                className="nav__lg-img2"
                width={220}
                height={120}
              />
            )}
          </Link>
        </div>
        <div></div>
        <Header />
      </nav>
    </header>
  );
}
