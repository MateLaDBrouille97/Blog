import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState,useMemo } from "react";

import Author from "./_child/Author";

import { useUserContext } from "../contexts/UserContext";
import { User } from "../src/models";
import { DataStore } from "aws-amplify";

export default function PostColBA({ postBA }) {
  
  const [user, setUser] = useState([]);
 

  useEffect(() => {
    const fetchUser = async () => {
      
      await DataStore.query(User, (user) => user.email.eq(postBA?.author?.email)).then(
        (user) => setUser(user[0])
      );
    };
    fetchUser();
  }, [postBA?.author]);

  return (
    <>
      <div className="flex gap-9 pl-4">
        <div className="custom-cont">
          <div className="image flex flex-col justify-start custom-image-wrapper9">
            <Link href={`/BlogArticles/${postBA?.id}`} legacyBehavior>
              <a className="postCol__img">
                {postBA?.imageUrl  && (
                  <Image
                    src={postBA?.imageUrl  || ""}
                    alt=""
                    width={250}
                    height={150}
                    className=" rounded postCol__img custom-image3"
                  />
                )}
              </a>
            </Link>
          </div>
        </div>
        <div className="info flex justify-center flex-col py-4">
          <div className="cat flex gap-3">
            <Link
              href={`/Categories/${
                postBA?.category?.name == "OPINIONS" || "ANALYSIS" || "GEOPOL"
                  ? "NEWS"
                  : postBA?.category?.name
              }`}
              legacyBehavior
            >
              <a className="text-orange-600 hover:text-orange-800">
                {postBA?.category?.name || "UnKnown"}
              </a>
            </Link>
            <Link href="/" legacyBehavior>
              <a className="text-gray-600 hover:text-gray-800">
                {/* {date || "UnKnown"} */}
              </a>
            </Link>
          </div>
          <div className="title">
            <Link href={`/BlogArticles/${postBA?.id}`} legacyBehavior>
              <a className=" postCol__title text-xl font-bold text-gray-800 hover:text-gray-600 ">
              {postBA?.title}
              </a>
            </Link>
          </div>
          {user ? <Author author={user} /> : <></>}
          
        </div>
        <div className="flex justify-center items-center my-4 py-2 mx-20">
          <Link href={`/BlogArticles/${postBA?.id}`} legacyBehavior>
              <a className=" postCol__title text-l font-serif text-gray-800 hover:text-gray-600 ">
              {postBA?.description.substring(0, 300) +
              (post?.title?.length > 29 ? "..." : "")}
              </a>
            </Link>
          </div>
      </div>
      <div className="flex justify-center items-center">
        <hr className=" my-10 border-gray-700 w-1/2" />
      </div>
    </>
  );
}
