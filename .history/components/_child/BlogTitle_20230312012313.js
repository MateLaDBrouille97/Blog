import Image from "next/image";
import Link from "next/link";
import React from "react";
import image from "../../public/images/otomat logo-black-on-white.png";

export default function BlogTitle() {
  return (
    <header className="header">
      <nav className="nav container">
        <div></div>
        <div className="nav__logo-container">  
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
      </nav>
    </header>
  );
}
