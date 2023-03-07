import React from 'react';
import Format from '@/layout/Format';
import Author from '@/components/_child/Author';

export default function Page() {
  return (
    <Format>
        <section className="container mx-auto md:px-2 py-16 w-1/2">
           <div className='flex justify-center'>
             <Author/>
           </div>
           <div className="post py-10">
            <h1 className="font-bold text-4xl text-center">
            Online app solution that enables the users to order from local vendors
            for food or X type of delivery using an app or web panel.
            </h1>
           </div>
        </section>
    </Format>
  )
}
