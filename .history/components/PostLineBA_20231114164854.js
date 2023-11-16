import React, { useEffect, useState } from "react";
import "swiper/css";
import Link from "next/link";
import Image from "next/image";
import Author from "./_child/Author";

import Spinner from "./_child/Spinner";

import { useUserContext } from "../contexts/UserContext";
import { DataStore } from "aws-amplify";
import { User } from "../src/models";
import Like3 from "./Like3";

export default function PostLineBA({ post }) {
  

  // const [date, setDate] = useState("");

  // useEffect(() => {
  //   const convertAwsDateToDate = (awsDate) => {
  //     const year = awsDate.substring(0, 4);
  //     const month = awsDate.substring(5, 7) - 1; // Subtract 1 since months are zero-indexed
  //     const day = awsDate.substring(8, 10);
  //     const newDate = new Date(year, month, day).toLocaleDateString();
  //     setDate(newDate);
  //   };
  //   convertAwsDateToDate(post?.createdAt);
  // }, [post]);

  

  /* Fetch Image */
  const [user, setUser] = useState([]);
 

  useEffect(() => {
    const fetchUser = async () => {
      await DataStore.query(User, (user) => user.email.eq(post?.author?.email)).then(
        (user) => setUser(user[0])
      );
    };
    fetchUser();
  }, [post]);

 

  return (
    <div className="grid postLine__container2 ">
      <div className="images custom-image-wrapper8">
        <Link href={`/BlogArticles/${post?.id}`} legacyBehavior>
          <a className="postLine__img2">
            {!post?.imageUrl ? (
              <Spinner />
            ) : (
              <Image src={post?.imageUrl} alt="" width={450} height={450} className="postCol__img custom-image6"/>
            )}
          </a>
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4 ">
        <div className="cat flex gap-6 pb-5">
        <Link href={`/Categories/${post?.category?.name === "OPINIONS" || post?.category?.name === "ANALYSIS" || post?.category?.name === "GEOPOL" ? "NEWS" : post?.category?.name}`} legacyBehavior>
            <a className="text-orange-600 hover:text-orange-800">
              {post?.category?.name || "UnKnown"}
            </a>
          </Link>
          <Link href="/" legacyBehavior>
            {/* <a className="text-gray-600 hover:text-gray-800">
              {date || "UnKnown"}
            </a> */}
          </Link>
        </div>
        <div className="title postLine__title">
          <Link href={`/BlogArticles/${post?.id}`} legacyBehavior>
            <a className="text-3xl md:text-4xl font-bold text-gray-800 hover:text-gray-600">
              {post?.title}
            </a>
          </Link>
        </div>
        <div className="postCol3-description pt-3">
           <p className="text-gray-500 py-3 pr-3 ">
          {post?.description}
        </p>
        </div>
       
        <div>
            {user ? <Author author={user} /> : <></>}
            <div className="slide__end-bar">
              <Like3 id={post?.id} />
            </div>
          </div>
      </div>
    </div>
  );
}
