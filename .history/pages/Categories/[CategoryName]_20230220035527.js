import Author from '@/components/_child/Author';
import Related from '@/components/_child/Related';
import Format from '@/layout/Format';
import Image from 'next/image';
import React from 'react'

export default function CategoryName() {
  return (
    <div>
        <Article/>
    </div>
  )
}


function Article({ post }) {
  

  return (
    <Format>
      <section className="container mx-auto md:px-2 py-16 w-1/2">
       
        <div className="post py-10">
          <h1 className="font-bold text-4xl text-center pb-5">{post?.title}</h1>
          <p className="text-gray-500 text-xl text-center"> {post?.subtitle}</p>
          <div className="py-10">
            <Image src={post?.img} alt="" width={900} height={600} />
          </div>
          
          <div className="content text-gray-600 text-lg flex flex-col gap-4">
            {post?.description}
          </div>
        </div>
        <div className="flex justify-end">
          {post?.Author ? <Author author={post?.Author} /> : <></>}
        </div>
        {post&&<Related post={post}/>}
      </section>
    </Format>
  );
}