import Author from '@/components/_child/Author';
import Related from '@/components/_child/Related';
import Format from '@/layout/Format';
import Image from 'next/image';
import React from 'react';
import blogData from "../api/blogDataName";
import { useRouter } from "next/router";


export default function CategoryName() {
  const router = useRouter();
  const categoryName = router?.query?.CategoryName;
  console.log(categoryName)
  return (
    <div>
        <Category/>
    </div>
  )
}


function Category({ post }) {
  

  return (
    <Format>
      <section className="container mx-auto md:px-2 py-16 w-1/2">
       
        <div className="post py-10">
          {/* <h1 className="font-bold text-4xl text-center pb-5">{post?.title}</h1> */}
          {/* <p className="text-gray-500 text-xl text-center"> {post?.subtitle}</p> */}
          <div className="py-10">
            {/* <Image src={post?.img} alt="" width={900} height={600} /> */}
          </div>
          
          <div className="content text-gray-600 text-lg flex flex-col gap-4">
            {post?.description}
          </div>
        </div>
        <div className="flex justify-end">
          {/* {post?.Author ? <Author author={post?.Author} /> : <></>} */}
        </div>
        {/* {post&&<Related post={post}/>} */}
      </section>
    </Format>
  );
}

export async function getStaticProps({ params }) {
  const {categoriesName}=blogData;
  return {
    props: {
      fallback:{
        '/':categoriesName
      }
    },
  };
}

export async function getStaticPaths() {
  const {categoriesName}=blogData;
  
  // console.log(posts);
  const paths = categoriesName.map((value) => {
    return {
      params: {
        CategoryName: value.name,
      },
    };
  });
  
  return {
    paths,
    fallback: false,
  };
}
