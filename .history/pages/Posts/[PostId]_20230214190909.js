import React from 'react';
import Format from '@/layout/Format';
import Author from '@/components/_child/Author';
import Image from 'next/image';
import Related from '@/components/_child/Related';
import img1 from "../../public/images/code.jpg";
import helper from "lib/helper";
import getPost from 'lib/helper';
import fetcher from '@/lib/fetcher';

export default function Page({Author,title,subtitle,img,description}) {
  return (
    <Format>
        <section className="container mx-auto md:px-2 py-16 w-1/2">
           <div className='flex justify-center'>
           {Author ? <Author author={Author} /> : <></>}
           </div>
           <div className="post py-10">
            <h1 className="font-bold text-4xl text-center pb-5">
            {title}
            </h1>
            <p className="text-gray-500 text-xl text-center"> {subtitle}</p>
            <div className="py-10">
               <Image 
                src={img}
                alt=""
                width={900}
                height={600}
               />
            </div>
            <div className="content text-gray-600 text-lg flex flex-col gap-4">
            {description}
             </div>

           </div>
           <Related/>
        </section>
    </Format>
  )
}


export async function getStaticProps({params}){
  const posts =await getPost(params.PostId);
  return{
    props: posts
  }
}

export async function getStaticPaths(){
  const posts= await getPost();
  console.log(posts);
  const paths =posts.map(value=>{
    return{
      params:{
        PostId:value.id.toString()
      }
    }
  })
  return{
    paths,
    fallback:false
  }
}