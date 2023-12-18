import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
// import Author from "./_child/Author";
import { useUserContext } from "../contexts/UserContext";
import { User } from "../src/models";
import { DataStore } from "aws-amplify";

export default function PostCol2BA({ post }) {
  // const [user, setUser] = useState([]);
   
  //   useEffect(() => {
  //     const fetchUser = async () => {
        
  //       await DataStore.query(User, (user) => user.email.eq(post?.author?.email)).then(
  //         (user) => setUser(user[0])
  //       );
  //     };
  //     fetchUser();
  //   }, [post]);


  
  const formatDate = (createdAt) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return new Date(createdAt).toLocaleDateString(undefined, options);
  };


  return (
    <>
      <div className="flex gap-5 p-2 m-4">
        <div className="custom-cont">
          <div className="image flex flex-col justify-start custom-image-wrapper9">
            <Link href={`/BlogArticles/${post?.id}`} legacyBehavior>
              <a className="postCol__img ">
                {post?.imageUrl && (
                  <Image
                    src={post?.imageUrl || ""}
                    alt=""
                    width={300}
                    height={250}
                    className=" rounded postCol__img custom-image3"
                  />
                )}
              </a>
            </Link>
          </div>
        </div>
        <div className="info flex justify-center flex-col py-4 mx-4">
          <div className="cat flex gap-3 mb-4">
            <Link
              href={`/Categories/${
                post?.category?.name == "OPINIONS" || "ANALYSIS" || "GEOPOL"
                  ? "NEWS"
                  : post?.category?.name
              }`}
              legacyBehavior
            >
              <a className="text-orange-600 hover:text-orange-800">
                {post?.category?.name || "UnKnown"}
              </a>
            </Link>
            <Link href="/" legacyBehavior>
              <a className="text-gray-600 hover:text-gray-800">
              {post?.createdAt ? `${formatDate(post.createdAt)}` : "UnKnown"}
              </a>
            </Link>
          </div>
          <div className="title mb-2">
            <Link href={`/BlogArticles/${post?.id}`} legacyBehavior>
              <a className=" postCol__title text-xl font-bold text-gray-800 hover:text-gray-600  ">
                {post?.title}
              </a>
            </Link>
          </div>
          <div className="description">
            <Link href={`/BlogArticles/${post?.id}`} legacyBehavior>
              <a className="postCol__description text-m  text-gray-800 hover:text-gray-600 mt-10">
              {post?.description?.substring(0, 150)+(post?.description?.length > 150 ? "..." : "")}
              </a>
            </Link>
          </div>
          {/* {user ? <Author author={user} /> : <></>} */}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <hr className=" my-10 border-gray-700 w-1/2" />
      </div>
    </>
  );
}
