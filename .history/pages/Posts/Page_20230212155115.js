import React from 'react';
import Format from '@/layout/Format';
import Author from '@/components/_child/Author';
import Image from 'next/image';
import img1 from "../public/images/code.jpg";

export default function Page() {
  return (
    <Format>
        <section className="container mx-auto md:px-2 py-16 w-1/2">
           <div className='flex justify-center'>
             <Author/>
           </div>
           <div className="post py-10">
            <h1 className="font-bold text-4xl text-center pb-5">
            Online app solution that enables the users to order from local vendors
            for food or X type of delivery using an app or web panel.
            </h1>
            <p className="text-gray-500 text-xl text-center">description</p>
            <div className="py-10">
               <Image 
                src={img1}
                alt=""
                width={900}
                height={600}
               />
            </div>
           </div>
        </section>
    </Format>
  )
}
