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
        </section>
    </Format>
  )
}
