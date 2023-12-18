import Link from "next/link";
import Image from "next/image";
import Author3BA from "./_child/Author3BA";
import React, { useEffect, useState,useMemo } from "react";


const PostsCardBA = ({ post, index }) => {

  const [user, setUser] = useState([]);
   
  useEffect(() => {
    const fetchUser = async () => {
      setUser(post?.author)
    };
    fetchUser();
  }, [post]);


  return (
   
      <div
        key={index}
        className="dark:bg-dark rounded-sm overflow-hidden shadow-xl relative"
      >
        <Image
          src={post?.imageUrl}
          layout="fill"
          objectFit="cover"
          alt="blog image"
          className="rounded-sm"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
        
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end p-3">
          <div className="px-3 inline-block text-gray-50 bg-sky-400 rounded-md whitespace-nowrap">
            {post.tags}{" "}
            <Link
              href={`/Categories/${
                post?.category?.name == "OPINIONS" ||
                post?.category?.name == "ANALYSIS" ||
                post?.category?.name == "GEOPOL"
                  ? "NEWS"
                  : post?.category?.name
              }`}
              legacyBehavior
            >
              <a className="text-orange-600 hover:text-orange-800">
                {post?.category?.name || "UnKnown"}
              </a>
            </Link>
          </div>
          <Link href={`/BlogArticles/${post?.id}`} legacyBehavior>
            <div className="text-xl mt-3 text-gray-50 font-bold dark:text-white">
              {post.title}
            </div>
          </Link>
          <p className="mt-3 dark:text-white text-gray-50 text-sm">
            {post.description.substring(0, 150) +
              (post.description.length > 150 ? "..." : "")}
          </p>

          <div className="flex mt-3 gap-3 items-center">
            {user ? <Author3BA author={user} /> : <></>}
          </div>
        </div>
      </div>
    
  );
};

export default PostsCardBA;