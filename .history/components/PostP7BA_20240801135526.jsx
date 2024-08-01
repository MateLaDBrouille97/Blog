import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";

import { useUserContext } from "../contexts/UserContext";
import { User } from "../src/models";
import { DataStore } from "aws-amplify";

import Author3 from "./_child/Author3";
import Author3BA from "./_child/Author3BA";
import AuthorBA from "./_child/AuthorBA";

export default function PostP7BA({ post }) {
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
    <>
      <div className="container3">
        <div className="col-div-6">
          <div className="box-1">
            <div className="image flex flex-col justify-start custom-image-wrapper4">
              <Link href={`/BlogArticles/${post?.id}`} legacyBehavior>
                <a className="postCol__img">
                  {post?.imageUrl && (
                    <Image
                      src={post?.imageUrl || ""}
                      alt=""
                      width={600}
                      height={500}
                      className=" rounded-md postCol__img custom-image4"
                    />
                  )}
                </a>
              </Link>
            </div>

            <div className="info flex justify-center flex-col py-4 m-3 text-xl">
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
              <div className="title mb-2  text">
                <Link href={`/BlogArticles/${post?.id}`} legacyBehavior>
                  <a className=" postCol__title2 text-3xl font-bold text-gray-800 hover:text-gray-600  ">
                  {post?.title?.substring(0, 29) +
              (post?.title?.length > 29 ? "..." : "")}
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
    </>
  );
}
