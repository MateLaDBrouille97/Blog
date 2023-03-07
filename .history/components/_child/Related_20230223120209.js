import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Author from "./Author";
import img1 from "../../public/images/code.jpg";
import Spinner from "./Spinner";
import Error from "./Error";
import fetcher from "@/lib/fetcher";
import { useBlogContext } from "@/contexts/BlogContext";
import { DataStore } from "aws-amplify";
import { User } from "@/src/models";
import { useUserContext } from "@/contexts/UserContext";
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

