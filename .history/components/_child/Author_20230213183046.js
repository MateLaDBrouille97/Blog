import React from 'react';
import Image from 'next/image';
import im1 from "../../public/ManuelTL2.jpg";
import Link from 'next/link';

export default function Author({author}) {
  return (
    <div className='author flex py-5'>
         <Image   
         className='rounded-full'     
          alt=""
          src={author?.image}
          width={50}
          height={50}
        />
        <div className="flex flex-col justify-center px-4 ">
          <Link href="/" legacyBehavior>
            <a className='text-md font-bold text-gray-800 hover:text-gray-600'>
               {author?.name}
            </a>
          </Link>
          <span className='text-sm text-gray-500'>{author?.position}</span>
        </div>
    </div>
  )
}
