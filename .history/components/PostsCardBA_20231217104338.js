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
    <div
      key={index}
      className="dark:bg-dark rounded-sm overflow-hidden shadow-xl relative cover"
    >
      {post?.imageUrl && (
        <Image
          src={post?.imageUrl}
          height={900}
          width={900}
          alt="blog image"
          className="rounded-sm"
        />
      )}

      <div className="absolute top-0 left-0 h-full flex flex-col justify-end p-3">
        <div className="opacity-40">
          <div className="info flex justify-center flex-col py-4 m-3 text-xl z-5">
            <div className="cat flex gap-3 mb-4 ">
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
                <a className="text-orange-600 hover:text-orange-800 ">
                  {post?.category?.name || "UnKnown"}
                </a>
              </Link>
              <Link href="/" legacyBehavior>
                <a className="text-gray-600 hover:text-gray-800 ">
                  {post?.createdAt
                    ? `${formatDate(post.createdAt)}`
                    : "UnKnown"}
                </a>
              </Link>
            </div>
            <div className="title mb-2 text">
              <Link href={`/BlogArticles/${post?.id}`} legacyBehavior>
                <a className=" postCol__title3 text-3xl font-bold text-gray-800 hover:text-gray-600  ">
                  {post?.title}
                </a>
              </Link>
              <hr className=" line-under" />
            </div>
            {/* <div className="description">
            <Link href={`/Posts/${post?.slug}`} legacyBehavior>
              <a className="postCol__description text-m  text-gray-800 hover:text-gray-600 mt-10">
              {post?.description}
              </a>
            </Link>
          </div> */}
            <div className="postCol-author2">
              {user ? <AuthorBA author={user} /> : <></>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostsCardBA;
