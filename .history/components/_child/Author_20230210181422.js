import React from 'react';
import Image from 'next/image';
import image from "../public/ManuelTL2.jpg";
import Link from 'next/link';

export default function Author() {
  return (
    <div className='author flex py-5'>
         <Image   
         className=''     
          alt=""
          src={image}
          width={60}
          height={60}
        />
        <div className="flex flex-col justify-center px-4 ">
          <Link href="/" legacyBehavior>
            <a className='text-md font-bold text-gray-800 hover:text-gray-600'>
               Manuel LABRIDY 
            </a>
          </Link>
          <span className='text-sm text-gray-500'>App Developer</span>
        </div>
    </div>
  )
}
