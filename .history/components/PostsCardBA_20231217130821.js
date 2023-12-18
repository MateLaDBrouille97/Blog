import Link from "next/link";
import Image from "next/image";
import Author3BA from "./_child/Author3BA";
import AuthorBA from "./_child/AuthorBA";
import React, { useEffect, useState, useMemo } from "react";

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
    <main>
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

        <div className="card-content">
          <h2>
            <span className=" postCol__title text-l font-bold text-white-800 hover:text-white-600  ">
              {post?.title}
            </span>
          </h2>
          
          <Link href={`/Posts/${post?.slug}`} legacyBehavior>
              <p className="postCol__description text-m text-gray-800 hover:text-gray-600 mt-10">
              {post?.description}
              </p>
            </Link>
          
          <a href="#" className="">
            Find out more
            <span className="material-symbols-outlined">arrow_right_alt</span>
          </a>
        </div>
      </div>
    </main>
  );
};

export default PostsCardBA;
