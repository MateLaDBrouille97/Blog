import Image from "next/image";
import Link from "next/link";
import React from "react";
import Author from "./_child/Author";
import img1 from "../public/images/code.jpg";

export default function Section2() {
  return (
    <section className="container mx-auto md:px-20 py-20">
      <div className="font-bold text-4xl py-12 text-center">
        {/* grid columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
          {Post()}
        </div>
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
        <div className="cat  gap-6">
          <Link href="/" legacyBehavior>
            <a className="text-orange-600 hover:text-orange-800">
              Business, Informatics
            </a>
          </Link>
          <Link href="/" legacyBehavior>
            <a className="text-gray-600 hover:text-gray-800">10,February</a>
          </Link>
        </div>
        <div className="title">
          <Link href="/" legacyBehavior>
            <a className="text-xl font-bold text-gray-800 hover:text-gray-600">
              Delivery App (Courier side)
            </a>
          </Link>
        </div>
        <p className="text-gray-500 py-3">
          Online app solution that enables the users to order from local vendors
          for food or X type of delivery using an app or web panel.
        </p>
        <Author />
      </div>
    </div>
  );
}
