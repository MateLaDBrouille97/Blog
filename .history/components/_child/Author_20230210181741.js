import React from 'react';
import Image from 'next/image';
import im1 from "../../public/ManuelTL2.jpg";
import Link from 'next/link';

export default function Author() {
  return (
    <div className='author flex py-5'>
         <Image   
         className='rounded-full'     
          alt=""
          src={im1}
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
