import Image from "next/image";
import Link from "next/link";
import React from "react";
import img1 from "../public/images/code.jpg";
import Author from "./_child/Author";
import Error from "./_child/Error";
import Spinner from "./_child/Spinner";
import fetcher from "@/lib/fetcher";

export default function Section4() {
  const { data, isLoading, isError } = fetcher("api/posts");
  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  const dataC =data?.filter((post)=>post.Category=="Code");
 
  const dataP =data?.filter((post)=>post.Category=="Project");

  return (
    <section className="container mx-auto md:px-20 py-16">
      <div className="grid lg:grid-cols-2 ">
        <div className="item">
          <h1 className="font-bold text-4xl py-12 text-center">Projects</h1>
          <div className="flex flex-col gap-6">
            {/* Post */}
            {dataP? dataP.map((post,index)=>(<Post post={post} key={post.id}/>)):<></>}
          </div>
        </div>
        <div className="item">
          <h1 className="font-bold text-4xl py-12 text-center">Code</h1>
          <div className="flex flex-col gap-6">
            {/* Post */}
            {dataC? dataC.map((post,index)=>(<Post post={post} key={post.id}/>)):<></>}
          </div>
        </div>
      </div>
    </section>
  );
}

function Post({post}) {
  return (
    <div className="flex gap-5">
      <div className="image flex flex-col justify-start">
        <Link href={`/Posts/${post?.id}`} legacyBehavior>
          <a>
            <Image
              src={post?.img}
              alt=""
              width={300}
              height={250}
              className="rounded"
            />
          </a>
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4">
        <div className="cat flex gap-3">
          <Link href="/" legacyBehavior>
            <a className="text-orange-600 hover:text-orange-800">
            {post?.Category || "UnKnown"}
            </a>
          </Link>
          <Link href="/" legacyBehavior>
            <a className="text-gray-600 hover:text-gray-800">{post?.published || "UnKnown"}</a>
          </Link>
        </div>
        <div className="title">
          <Link href={`/Posts/${post?.id}`} legacyBehavior>
            <a className="text-xl font-bold text-gray-800 hover:text-gray-600">
            {post?.title}
            </a>
          </Link>
        </div>
        {post?.Author ? <Author author={post?.Author} /> : <></>}
      </div>
    </div>
  );
}
