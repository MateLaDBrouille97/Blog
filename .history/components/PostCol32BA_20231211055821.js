import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { useUserContext } from "../contexts/UserContext";
import { User } from "../src/models";
import { DataStore } from "aws-amplify";
import Author2 from "./_child/Author2";
import Author2BA from "./_child/Author2BA";

export default function PostCol32({ post }) {

  const [user, setUser] = useState();
   
  useEffect(() => {
    const fetchUser = async () => {
      
     setUser(post?.author)
    };
    fetchUser();
  }, [post]);

  


  return (
    <>
      <div className="flex  p-2  ">
        <div className="custom-cont2">
          <div className="image flex flex-col justify-start custom-image-wrapper9">
            <Link href={`/BlogArticles/${post?.id}`} legacyBehavior>
              <a className="postCol__img">
                {post?.imageUrl && (
                  <Image
                    src={post?.imageUrl || ""}
                    alt=""
                    width={200}
                    height={450}
                    className=" rounded postCol__img custom-image3 img-zoom"
                  />
                )}
              </a>
            </Link>
          </div>
        </div>
        <div className="info flex justify-center flex-col py-4 mx-3">
          <div className="cat flex gap-3 mb-4 ml-4">
            <Link
              href={`/Categories/${
                post?.category?.name == "OPINIONS" || post?.category?.name =="ANALYSIS" ||post?.category?.name == "GEOPOL"
                  ? "NEWS"
                  : post?.category?.name
              }`}
              legacyBehavior
            >
              <a className="text-orange-600 hover:text-orange-800 text-l">
                {post?.category?.name || "UnKnown"}
              </a>
            </Link>
            {/* <Link href="/" legacyBehavior>
              <a className="text-gray-600 hover:text-gray-800 text-l">
                {date || "UnKnown"}
              </a>
            </Link> */}
          </div>
          <div className="title  ml-4">
            <Link href={`/BlogArticles/${post?.id}`} legacyBehavior>
              <a className=" postCol__title text-2xl font-bold text-gray-800 hover:text-gray-600  ">
                {post?.title}
              </a>
            </Link>
          </div>
          {/* <div className="description">
            <Link href={`/Posts/${post?.slug}`} legacyBehavior>
              <a className="postCol__description text-m  text-gray-800 hover:text-gray-600 mt-10">
              {post?.description}
              </a>
            </Link>
          </div> */}
          {user ? <Author2BA author={user} /> : <></>}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <hr className=" my-10 border-gray-700 w-1/2" />
      </div>
    </>
  );
}
