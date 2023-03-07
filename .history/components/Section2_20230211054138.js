import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Section2() {
  return (
    <section className="container mx-auto md:px-20 py-20">
      <div className="font-bold text-4xl py-12 text-center">
        {/* grid columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14"></div>
      </div>
    </section>
  );
}

function Post() {
  return (
    <div className="item">
      <div className="images">
        <Link href="/" legacyBehavior>
          <a>
            <Image
              src={img1}
              alt=""
              width={500}
              height={350}
              className="rounded"
            />
          </a>
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4">
      <div className="cat flex gap-6">
          <Link href="/" legacyBehavior>
            <a className="text-orange-600 hover:text-orange-800">
              Business, Information
            </a>
          </Link>

          <Link href="/" legacyBehavior>
            <a className="text-gray-600 hover:text-gray-800">10,February</a>
          </Link>
        </div>
        <div className="title">
          <Link href="/" legacyBehavior>
            <a className="text-3xl md:text-6xl font-bold text-gray-800 hover:text-gray-600">
              Delivery App (Courier side)
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
