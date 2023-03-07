import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Author from "./Author";
import img1 from "../../public/images/code.jpg";
import Spinner from "./Spinner";
import Error from "./Error";
import fetcher from "@/lib/fetcher";

export default function Related({post}) {

  const [related,setRelated]=useState([]);
 
  const { data, isLoading, isError } = fetcher("api/posts");
  useEffect(()=>{
    const dataRelated= data.filter((value)=>value.Category==post.Category);
    setRelated(dataRelated);
  },[])

  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

 

  return (
    <section className="pt-20">
      <h1 className="font-bold text-3xl py-10">Related</h1>
      <div className="flex flex-col gap-10">
      {related && related.map((post,index)=>
          (<Post post={post} key={post.id}/>)
          )}
      </div>
    </section>
  );
}

function Post({post}) {
  return (
    <div className="flex gap-5">
      <div className="image flex flex-col justify-start">
        <Link href="/" legacyBehavior>
          <a>
            <Image
              src={post?.img||"/"}
              alt=""
              width={300}
              height={200}
              className="rounded"
            />
          </a>
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4">
        <div className="cat flex gap-3">
          <Link href="/" legacyBehavior>
            <a className="text-orange-600 hover:text-orange-800">
            {post?.Category||"UnKnown"}
            </a>
          </Link>
          <Link href="/" legacyBehavior>
            <a className="text-gray-600 hover:text-gray-800">{post?.published||"UnKnown"}</a>
          </Link>
        </div>
        <div className="title">
          <Link href="/" legacyBehavior>
            <a className="text-xl font-bold text-gray-800 hover:text-gray-600">
            {post?.title}
            </a>
          </Link>
        </div>
        {post?.Author?<Author author={post?.Author}/>:<></>}
        </div>
    </div>
  );
}
