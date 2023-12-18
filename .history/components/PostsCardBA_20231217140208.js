import Link from "next/link";
import Image from "next/image";
import Author3BA from "./_child/Author3BA";
import AuthorBA from "./_child/AuthorBA";
import React, { useEffect, useState, useMemo } from "react";
import {ArrowRight} from "lucide-react"

const PostsCardBA = ({ post, index }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      setUser(post?.author);
    };
    fetchUser();
  }, [post]);

  const formatDate = (createdAt) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return new Date(createdAt).toLocaleDateString(undefined, options);
  };

  return (
    <main2 className="flex items-center justify-center">
      <div className="card">
        {post?.imageUrl && (
          <Image
            src={post?.imageUrl}
            height={900}
            width={900}
            alt="blog image"
            className="rounded-sm"
          />
        )}

        <div className="card-content justify-start">
          <h2 className=" text-xl font-bold text-white-800 hover:text-white-600 px-1 mx-1 ">
            {post?.title}
          </h2>

          <Link href={`/Posts/${post?.slug}`} legacyBehavior>
            <p className="text-m text-white-800 hover:text-white-600  ">
              {post?.description?.substring(0, 150) +
                (post?.description?.length > 150 ? "..." : "")}
            </p>
          </Link>

          <p href="#" className="flex justify-start ">
            Find out more  <ArrowRight className="material-symbols-outlined"/>
            
          </p>
        </div>
      </div>
    </main2>
  );
};

export default PostsCardBA;
