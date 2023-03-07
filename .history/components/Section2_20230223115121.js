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
    <section className="container mx-auto md:px-20 py-20">
      <h1 className="font-bold text-4xl py-12 text-center">Latest Posts</h1>
      {/* grid columns */}
      {data ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
          {data &&
            data.map((post, index) => <Post3col post={post} key={post.id} />)
            }
        </div>
      ) : (
        <div className="flex flex-col justify-center item-center">
          <Error />
        </div>
      )}
    </section>
  );
}
