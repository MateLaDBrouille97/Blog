import Link from "next/link";
import Image from "next/image";
import Author3BA from "./_child/Author3BA";
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
    <div
      key={index}
      className="dark:bg-dark rounded-sm overflow-hidden shadow-xl relative"
    >
      {post?.imageUrl && (
        <Image
          src={post?.imageUrl}
          height={900}
          width={900}
          alt="blog image"
          className="rounded-sm co"
        />
      )}
      <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>

      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-end p-3">
        <div className="info flex justify-center flex-col py-4">
          <div className="cat flex gap-6 pt-2 pb-2">
            <Link
              href={`/Categories/${
                post?.category == "OPINIONS" || "ANALYSIS" || "GEOPOL"
                  ? "NEWS"
                  : post?.category
              }`}
              legacyBehavior
            >
              <a className="text-orange-600 hover:text-orange-800">
                {post?.category || "UnKnown"}
              </a>
            </Link>
            <Link href="/" legacyBehavior>
              <a className="text-gray-600 hover:text-gray-800">
                {post?.createdAt ? `${formatDate(post.createdAt)}` : "UnKnown"}
              </a>
            </Link>
          </div>
          <div className="title post3col-title">
            <Link href={`/Posts/${post?.slug}`} legacyBehavior>
              <a className="text-3xl font-bold text-gray-800 hover:text-gray-600 ">
                {post?.title}
              </a>
            </Link>
          </div>
          <div className="postCol3-description">
            <p className="text-gray-500 py-3 ">
              {post?.description?.substring(0, 150) +
                (post?.description?.length > 150 ? "..." : "")}
            </p>
          </div>
          <div>
            {user ? <Author3BA author={user} /> : <></>}
            <div className="slide__end-bar"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsCardBA;
