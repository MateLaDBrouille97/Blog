import Image from "next/image";
import Link from "next/link";
import React from "react";
import img1 from "../public/images/code.jpg";
import Author from "./_child/Author";

export default function Section4() {
  return (
    <section className="container mx-auto md:px-20 py-16">
      <div className="grid lg:grid-cols-2">
        <div className="item">
          <h1 className="font-bold text-4xl py-12 text-center">Projects</h1>
          <div className="flex flex-col gap-6">{/* Post */}
          {Post()}
          </div>

        </div>
        <div className="item"></div>
      </div>
    </section>
  );
}

function Post() {
  return (
    <div className="flex gap-5">
      <div className="image flex flex-col justify-start">
        <Link href="/" legacyBehavior>
          <a>
            <Image
              src={img1}
              alt=""
              width={450}
              height={300}
              className="rounded"
            />
          </a>
        </Link>
      </div>
      <div className="info flex justify-center flex-col">
        <div className="cat flex gap-7">
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
        <Author/>
      </div>
    </div>
  );
}
