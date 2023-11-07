import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import img1 from "../public/images/code.jpg";
import Author from "./_child/Author";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import Spinner from "./_child/Spinner";
import Error from "./_child/Error";
import fetcher from "@/lib/fetcher";
import { useBlogContext } from "@/contexts/BlogContext";
import { useUserContext } from "@/contexts/UserContext";
import { DataStore } from "aws-amplify";
import { User } from "@/src/models";
import Like2 from "./Like2";
import Like3 from "./Like3";

export default function Slide({ post }) {
  const aws = require("aws-sdk");
  const s3 = new aws.S3();
  const { dbUser } = useUserContext();
  const [date, setDate] = useState("");
  const [user, setUser] = useState("");
  const [postImage, setPostImage] = useState("");

  useEffect(() => {
    const convertAwsDateToDate = (awsDate) => {
      if (awsDate) {
        const year = awsDate.substring(0, 4);
        const month = awsDate.substring(5, 7) - 1; // Subtract 1 since months are zero-indexed
        const day = awsDate.substring(8, 10);
        const newDate = new Date(year, month, day).toLocaleDateString();
        setDate(newDate);
      }
    };
    convertAwsDateToDate(post?.createdAt);
  }, [post]);

  useEffect(() => {
    const fetchUser = async () => {
      await DataStore.query(User, (user) => user.id.eq(post?.userID)).then(
        (user) => setUser(user[0])
      );
    };
    fetchUser();
  }, []);

  /* Fetch Image */
  aws.config.update({
    accessKeyId: "AKIAQK7EQ4DINBSQQM5L",
    secretAccessKey: "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",
  });

  useEffect(() => {
    const fetchImage = async () => {
      const params = {
        Bucket: "portfolioml26151fd83d4a40cb89e358a0b8c234d582358-staging",
        Key: post?.image,
      };
      await s3
        .getSignedUrlPromise("getObject", params)
        .then((i) => setPostImage(i));
    };
    fetchImage();
  }, [dbUser]);

  return (
    <div className="slide__container">
      <div className="grid md:grid-cols-2 ">
      <div className="image custom-image-wrapper4 ">
        <Link href={`/Posts/${post?.slug}`} legacyBehavior>
          <a>
            {!postImage ? (
              <Spinner />
            ) : (
              <Image src={postImage} alt="" width={600} height={800} className="postCol__img custom-image10" />
            )}
          </a>
        </Link>
      </div>
      <div className="slide-info">
        <div className="cat flex gap-6 ">
          <Link href={`/Categories/${post?.category=="OPINIONS"||"ANALYSIS"||"GEOPOL"?"NEWS":post?.category}`} legacyBehavior>
            <a className="text-orange-600 hover:text-orange-800">
              {post?.category || "UnKnown"}
            </a>
          </Link>

          <Link href="/" legacyBehavior>
            <a className="text-gray-600 hover:text-gray-800">
              {date || "UnKnown"}
            </a>
          </Link>
        </div>
        <div className="title">
          <Link href={`/Posts/${post?.slug}`} legacyBehavior>
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
