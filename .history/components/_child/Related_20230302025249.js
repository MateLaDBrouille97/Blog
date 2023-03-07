import React, { useEffect, useState } from "react";
import { useBlogContext } from "@/contexts/BlogContext";
import PostCol from "../PostCol";

export default function Related({post}) {

  const [related,setRelated]=useState([]);
  const {data} =useBlogContext()
  // const { data, isLoading, isError } = fetcher("api/posts");
  useEffect(()=>{
    const dataRelated= data?.filter((value)=>value.category==post?.category);
    setRelated(dataRelated);
  },[])

  // if (isLoading) return <Spinner />;
  // if (isError) return <Error />;

  return (
    <section className="pt-20">
      <div className="flex pb-8 mt-10 mb-20 section1__posts">
        <h1 className="font-bold text-4xl py-8 text-begin section1__posts-title">Related</h1>
      </div>
      
      <div className="flex flex-col gap-10">
      {related && related.slice(0, 5).map((post,index)=>
          (<PostCol post={post} key={post.id}/>)
          )}
      </div>
    </section>
  );
}

