import Link from "next/link";
import Image from "next/image";
import Author3BA from "./_child/Author3BA";
import React, { useEffect, useState,useMemo } from "react";


const PostsCard = ({ post, index }) => {

  const [user, setUser] = useState([]);
   
  useEffect(() => {
    const fetchUser = async () => {
      setUser(post?.author)
    };
    fetchUser();
  }, [post]);


  return (
    <Link href={`/BlogArticles/${post?.id}`} legacyBehavior>
      <div
        key={index}
        className="dark:bg-dark rounded-sm overflow-hidden shadow-xl"
      >
        <div className="w-full flex">
          <Image
            src={post?.imageUrl}
            height={900}
            width={900}
            alt="blog image"
            className="rounded-sm"
          />
        </div>

        <div className="p-3">
          <div className="px-3 inline-block text-gray-50 bg-sky-400 rounded-md whitespace-nowrap ">
            {post.tags} <Link
                  href={`/Categories/${
                    post?.category?.name == "OPINIONS"||post?.category?.name =="ANALYSIS"||post?.category?.name =="GEOPOL" ? "NEWS" : post?.category?.name
                  }`}
                  legacyBehavior
                >
                  <a className="text-orange-600 hover:text-orange-800  ">
                    {post?.category?.name || "UnKnown"}
                  </a>
                </Link>
          </div>
          <Link href={`/BlogArticles/${post?.id}`} legacyBehavior>
          <div className="text-xl mt-3 text-gray-900 font-bold dark:text-white">
            {post.title}
          </div>
          </Link>
          <p className="mt-3 dark:text-white text-gray-900 text-sm">
            {post.description.substring(0, 150) +
              (post.description.length > 150 ? "..." : "")}
          </p>

          <div className="flex mt-3 gap-3 items-center">
          {user ? <Author3BA author={user} /> : <></>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostsCard;