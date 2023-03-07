import Image from "next/image";
import Link from "next/link";
import React from "react";
import Author from "./_child/Author";
import img1 from "../public/images/code.jpg";
import getPost from "@/lib/helper";
import fetcher from "@/lib/fetcher";


export default function Section2() {


const{data,isLoading,isError}=fetcher('api/posts');
console.log(data);
  
  return (
    <section className="container mx-auto md:px-20 py-20">
      <h1 className="font-bold text-4xl py-12 text-center">
        Latest Posts
      </h1>
      {/* grid columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
          {data && data.map((post,index)=>
          (<Post post={post} key={post.id}/>)
          )}
          
        </div>
    </section>
  );
}

function Post({post}) {
  return (
    <div className="item">
      <div className="images">
        <Link href="/" legacyBehavior>
          <a>
            <Image
              src={post?.img||"/"}
              alt=""
              width={500}
              height={350}
              className="rounded"
            />
          </a>
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4">
        <div className="cat flex gap-6">
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
        <p className="text-gray-500 py-3">
          {post?.description}
        </p>
        {post?.Author?<Author author={post?.Author}/>:<></>}
      </div>
    </div>
  );
}
