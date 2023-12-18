import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import Author from "./_child/Author";

import "swiper/css";
import "swiper/css/pagination";

import Spinner from "./_child/Spinner";

// import { useUserContext } from "../contexts/UserContext";
import { DataStore } from "aws-amplify";
import { User } from "../src/models";

import Like3 from "./Like3";

export default function SlideBA({ post }) {

  const [user, setUser] = useState([]);
   
  useEffect(() => {
    const fetchUser = async () => {
      
      await DataStore.query(User, (user) => user.email.eq(post?.author?.email)).then(
        (user) => setUser(user[0])
      );
    };
    fetchUser();
  }, [post?.author]);

  
  const formatDate = (createdAt) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return new Date(createdAt).toLocaleDateString(undefined, options);
  };

  return (
    <div className="slide__container">
      <div className="grid md:grid-cols-2 ">
      <div className="image custom-image-wrapper4 ">
        <Link href={`/BlogArticles/${post?.id}`} legacyBehavior>
          <a>
            {!post?.imageUrl ? (
              <Spinner />
            ) : (
              <Image src={post?.imageUrl} alt="" width={600} height={800} className="postCol__img custom-image10" />
            )}
          </a>

        </Link>
      </div>
      <div className="slide-info">
        <div className="cat flex gap-6 ">
          <Link href={`/Categories/${post?.category?.name=="OPINIONS"||post?.category?.name=="ANALYSIS"||post?.category?.name=="GEOPOL"?"NEWS":post?.category?.name}`} legacyBehavior>
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
        <div className="title">
          <Link href={`/BlogArticles/${post?.id}`} legacyBehavior>
            <a className="slide__title text-3xl md:text-6xl font-bold text-gray-800 hover:text-gray-600">
              {post?.title}
            </a>
          </Link>
        </div>
        <div className="slide__description">
          <p className="text-gray-500 py-3 mr-20 ">{post?.description}</p>
          
        </div>
        <div className="slide-author">
          {user ? <Author author={user} /> : <></>}
          <div className="slide__end-bar" >
            <Like3 id={post?.id}/>
          </div>
        </div>
        
      </div>
    </div>
    </div>
    
  );
}
