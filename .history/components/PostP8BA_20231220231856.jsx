import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState,useMemo } from "react";

import { useUserContext } from "../contexts/UserContext";
import { User } from "../src/models";
import { DataStore } from "aws-amplify";
import Author3 from "./_child/Author3";
import Author3BA from "./_child/Author3BA";

export default function PostP8({ post }) {
  
  const [user, setUser] = useState([]);
   
  useEffect(() => {
    const fetchUser = async () => {
      
      setUser(post?.author)
    };
    fetchUser();
  }, [post]);

  return (
    <>
      <div class="">
        <div class="col-div-6">
          <div class="box-1">
            <div className="image flex flex-col justify-start custom-image-wrapper5">
              <Link href={`/BlogArticles/${post?.id}`} legacyBehavior>
                <a className="postCol__img">
                  {post?.imageUrl && (
                    <Image
                      src={post?.imageUrl || ""}
                      alt=""
                      width={600}
                      height={500}
                      className=" rounded postCol__img custom-image3"
                    />
                  )}
                </a>
              </Link>
            </div>

            <div className="info flex justify-center flex-col py-4 ">
              <div className="cat flex gap-2 mb-1">
                <Link
                  href={`/Categories/${
                    post?.category?.name == "OPINIONS"||post?.category?.name =="ANALYSIS"||post?.category?.name =="GEOPOL" ? "NEWS" : post?.category?.name
                  }`}
                  legacyBehavior
                >
                  <a className="text-orange-600 hover:text-orange-800  ">
                    {post?.category?.name || "UnKnown"}
                  </a>
                </Link>
                {/* <Link href="/" legacyBehavior>
                  <a className="text-gray-600 hover:text-gray-800 ">
                    {date || "UnKnown"}
                  </a>
                </Link> */}
              </div>
              <div className="title mb-2  text">
                <Link href={`/BlogArticles/${post?.id}`} legacyBehavior>
                  <a className=" postCol__title text-l font-bold text-gray-800 hover:text-gray-600  ">
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
          <div className="postCol-author">
            {user ? <Author3BA author={user} /> : <></>}
          </div>
              
            </div>
          </div>
        </div>

        
      </div>
    </>
  );
}
