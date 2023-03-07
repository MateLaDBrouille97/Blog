import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import img1 from "../public/images/code.jpg";
import Author from "./_child/Author";
import Error from "./_child/Error";
import Spinner from "./_child/Spinner";
import fetcher from "@/lib/fetcher";
import { useBlogContext } from "@/contexts/BlogContext";
import { useUserContext } from "@/contexts/UserContext";
import { User } from "@/src/models";
import { DataStore } from "aws-amplify";

export default function Section4() {

  const {blogUFH,
    blogP,
    blogN,
    data}=useBlogContext();

  // const { isLoading, isError } = fetcher("api/posts");
  // if (isLoading) return <Spinner />;
  // if (isError) return <Error />;

  // const dataC =data?.filter((post)=>post.Category=="Code");
 
  // const dataP =data?.filter((post)=>post.Category=="Project");

  return (
    <section className="container mx-auto md:px-20 py-16">
      <div className="grid lg:grid-cols-2 ">
        <div className="item">
          <h1 className="font-bold text-4xl py-12 text-center">Projects</h1>
          <div className="flex flex-col gap-6">
            {/* Post */}
            {blogP? blogP.slice(0, 5).map((post,index)=>(<Post post={post} key={post.id}/>)):<></>}
          </div>
        </div>
        <div className="item">
          <h1 className="font-bold text-4xl py-12 text-center">IT News</h1>
          <div className="flex flex-col gap-6">
            {/* Post */}
            {blogN? blogN.slice(0, 5).map((post,index)=>(<Post post={post} key={post.id}/>)):<></>}
          </div>
        </div>
      </div>
    </section>
  );
}

