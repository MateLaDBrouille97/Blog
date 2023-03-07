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
      <h1 className="font-bold text-3xl py-10">Related</h1>
      <div className="flex flex-col gap-10">
      {related && related.slice(0, 5).map((post,index)=>
          (<PostCol post={post} key={post.id}/>)
          )}
      </div>
    </section>
  );
}

