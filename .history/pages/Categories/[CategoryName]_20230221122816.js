import Author from '@/components/_child/Author';
import Related from '@/components/_child/Related';
import Format from '@/layout/Format';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import blogData from "../api/blogDataName";
import { useRouter } from "next/router";
import { useBlogContext } from '@/contexts/BlogContext';


export default function CategoryName() {
  const router = useRouter();
  const categoryName = router?.query?.CategoryName;
  const {categoriesName}=blogData;
  const [cat, setCat] = useState("");

  useEffect(() => {
    const postsD =  () => {
      if(!router.isReady)return;
      const filt = categoriesName?.filter((value) => value?.name ==categoryName );
      setCat(filt?.[0]);  
    };
    postsD();
  }, [router.query.CategoryName, router.isReady]);
  
  return (
    <div>
       {cat&&<Category category={cat}/>}
    </div>
  )
}


function Category({ category }) {
  

  return (
    <Format>
      <section className="container mx-auto md:px-2 py-16 w-1/2">
       
        <div className="post py-10 flex flex-row justify-begin
         item-center">
          <div className="py-10 flex justify-center item-center" >
            <Image src={category?.image} alt="" width={120} height={80} priority/>
          </div>
          <h1 className="font-bold text-4xl text-center pb-5">{category?.name}</h1>
          
        </div>
        <div className="flex justify-end">
          {/* {post?.Author ? <Author author={post?.Author} /> : <></>} */}
        </div>
        {/* {post&&<Related post={post}/>} */}
      </section>
    </Format>
  );
}

// export async function getStaticProps({ params }) {
//   const {categoriesName}= blogDataName;
  
//   return {
//     props: {
//       fallback:{
//         '/Categories':categoriesName
//       }
//     },
//   };
// }

// export async function getStaticPaths() {
//   const {categoriesName}= blogDataName;
//   console.log(categoriesName);
  
//   const paths = categoriesName?.map((value) => {
//     return {
//       params: {
//         CategoryName: value.name,
//       },
//     };
//   });
  
//   return {
//     paths,
//     fallback: false,
//   };
// }
