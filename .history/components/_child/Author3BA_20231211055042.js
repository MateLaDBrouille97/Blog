import React, { useEffect, useState } from "react";

import Link from "next/link";


export default function Author3BA({ author }) {
  
  

  return (
    <div className="author flex py-2">
      {/* <Image
        className="rounded-full "
        alt=""
        src={image}
        width={50}
        height={50}
      /> */}
      <div className="flex flex-col justify-center">
        
       <Link href="/" legacyBehavior>
          <a className="text-md flex justify-begin font-bold text-gray-800 hover:text-gray-600">
           {author?.firstName}
          </a>
        </Link>
        <span className="text-sm text-gray-500">
          {author?.title}
        </span>
      </div>
    </div>
  );
}
