import React, { useEffect, useState } from "react";
import Image from "next/image";

import Link from "next/link";


export default function AuthorBA({ author }) {
  


  return (
    <div className="author flex  py-5">
      <Image
        className="rounded-full author-img"
        alt=""
        src={author?.image}
        width={50}
        height={50}
      />
      <div className="flex flex-col justify-center px-4 ">
        <Link href="/" legacyBehavior>
          <a className="text-md flex justify-begin font-bold text-gray-900 hover:text-gray-600 author-name">
            {author?.firstName}
          </a>
        </Link>
        <span className="text-sm text-gray-500 author-title">
          {author?.title}
        </span>
      </div>
    </div>
  );
}
