import Link from "next/link";
import React from "react";
import {ImGithub, ImInstagram, ImLinkedin } from "react-icons/im";
import Newsletter from "./_child/Newsletter";

export default function Footer() {

  const bg={
    background: "url('/images/Miroodles2.png')no-repeat",
    
    backgroundPosition: "bottom left",
  }
  return (
    <footer className="bg-gray-50" style={bg}>
      <Newsletter/>
      <div className="container mx-auto flex justify-center py-12">
        <div className="py-5">
          <div className="flex gap-6 justify-center">
          <Link href="/" legacyBehavior>
              <a>
                <ImInstagram color="#888888" />
              </a>
            </Link>
            <Link href="/" legacyBehavior>
              <a>
                <ImLinkedin color="#888888" />
              </a>
            </Link>
            <Link href="/" legacyBehavior>
              <a>
                <ImGithub color="#888888" />
              </a>
            </Link>
          </div>
          <p className="py-5 text-gray-400">Copyright &#169;2022 Manuel LABRIDY All rights reserved</p>
          <p className="text-gray-400 text-center">Terms & Conditions</p>
        </div>
      </div>
    </footer>
  );
}
