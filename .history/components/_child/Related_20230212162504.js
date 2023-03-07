import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Related() {
  return (
    <section className="pt-20">
      <h1 className="font-bold text-3xl py-10">Related</h1>
      <div className="flex flex-col gap-10">
        
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
              width={300}
              height={250}
              className="rounded"
            />
          </a>
        </Link>
      </div>
    </div>
  );
}
