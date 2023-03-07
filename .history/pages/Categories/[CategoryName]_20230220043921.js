import Author from '@/components/_child/Author';
import Related from '@/components/_child/Related';
import Format from '@/layout/Format';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import blogData from "../api/blogDataName";
import { useRouter } from "next/router";


export default function CategoryName() {
  const router = useRouter();
  const categoryName = router?.query?.CategoryName;

  const [cat, setCat] = useState("");

  useEffect(() => {
    const postsD =  () => {
      const {categoriesName}=blogData;
      const filt = categoriesName.filter((value) => value.name ==categoryName );
      setCat(filt[0]);
    };
    postsD();
  }, []);
  
  return (
    <div>
        <Category category={cat}/>
    </div>
  )
}


function Category({ category }) {
  

  return (
    <Format>
      <section className="container mx-auto md:px-2 py-16 w-1/2">
       
        <div className="post py-10">
          <h1 className="font-bold text-4xl text-center pb-5">{category?.name}</h1>
          <div className="py-10">
            <Image src={category?.image} alt="" width={800} height={600} />
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
