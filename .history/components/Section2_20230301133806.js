import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Author from "./_child/Author";
import img1 from "../public/images/code.jpg";
import getPost from "@/lib/helper";
import fetcher from "@/lib/fetcher";
import Spinner from "./_child/Spinner";
import Error from "./_child/Error";
import { useBlogContext } from "@/contexts/BlogContext";
import { useUserContext } from "@/contexts/UserContext";
import { User } from "@/src/models";
import { DataStore } from "aws-amplify";
import Post3col from "@/components/Post3Col";


export default function Section2() {
  const { data } = useBlogContext();
  // const { isLoading, isError } = fetcher("api/posts");
  // if (isLoading) return <Spinner />;
  // if (isError) return <Error />;

  return (
    <section className="section mx-auto md:px-20 py-20">
      <div className="container">
      <div className="flex justify-center pb-8 mt-10 mb-20 section1__posts">
        <h1 className="font-bold text-4xl py-8 text-center section1__posts-title">Latest Posts</h1>
      </div>
      
      {/* grid columns */}
      {data ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
          {data &&
            data.slice(0, 9).map((post, index) => <Post3col post={post} key={post.id} />)
            }
        </div>
      ) : (
        <div className="flex flex-col justify-center item-center">
          <Error />
        </div>
      )}
      </div>
    </section>
  );
}
