import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState,useMemo } from "react";
import { useUserContext } from "../contexts/UserContext";
import { User } from "../src/models";
import { DataStore } from "aws-amplify";
import Author2 from "./_child/Author2";

export default function PostCol32({ post }) {
  const aws = require("aws-sdk");
  const s3 = new aws.S3();
  const { dbUser } = useUserContext();
  const [date, setDate] = useState("");
  const [user, setUser] = useState([]);
  const [postImage, setPostImage] = useState("");

  useEffect(() => {
    
    const convertAwsDateToDate = (awsDate) => {
      const year = awsDate.substring(0, 4);
      const month = awsDate.substring(5, 7) - 1; // Subtract 1 since months are zero-indexed
      const day = awsDate.substring(8, 10);
      const newDate = new Date(year, month, day).toLocaleDateString();
      setDate(newDate);
    };
    convertAwsDateToDate(post?.createdAt);
  
    const fetchUserAndImage = async () => {
      await DataStore.query(User, (user) => user.id.eq(post?.userID)).then(
        (user) => setUser(user[0])
      );
  
      aws.config.update({
        accessKeyId: "AKIAQK7EQ4DIDZCALTUA",
    secretAccessKey: "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",
      });

      const params = {
        Bucket: "portfolioml26151fd83d4a40cb89e358a0b8c234d582358-staging",
        Key: post?.image,
      };
      await s3
        .getSignedUrlPromise("getObject", params)
        .then((i) => setPostImage(i));
    };
  
    fetchUserAndImage();
  }, [aws.config, post, s3]);
  



  return (
    <>
      <div className="flex  p-2  ">
        <div className="custom-cont2">
          <div className="image flex flex-col justify-start custom-image-wrapper9">
            <Link href={`/Posts/${post?.slug}`} legacyBehavior>
              <a className="postCol__img">
                {postImage && (
                  <Image
                    src={postImage || ""}
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
                post?.category == "OPINIONS" || "ANALYSIS" || "GEOPOL"
                  ? "NEWS"
                  : post?.category
              }`}
              legacyBehavior
            >
              <a className="text-orange-600 hover:text-orange-800 text-2xl">
                {post?.category || "UnKnown"}
              </a>
            </Link>
            {/* <Link href="/" legacyBehavior>
              <a className="text-gray-600 hover:text-gray-800 text-l">
                {date || "UnKnown"}
              </a>
            </Link> */}
          </div>
          <div className="title  ml-4">
            <Link href={`/Posts/${post?.slug}`} legacyBehavior>
              <a className=" postCol__title text-4xl font-bold text-gray-800 hover:text-gray-600  ">
              {post?.title?.substring(0, 29) +
              (post?.title?.length > 29 ? "..." : "")}
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
          {user ? <Author2 author={user} /> : <></>}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <hr className=" my-10 border-gray-700 w-1/2" />
      </div>
    </>
  );
}
