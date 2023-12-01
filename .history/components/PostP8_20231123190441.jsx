import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState,useMemo } from "react";

import { useUserContext } from "../contexts/UserContext";
import { User } from "../src/models";
import { DataStore } from "aws-amplify";
import Author3 from "./_child/Author3";

export default function PostP8({ post }) {
  const aws = require("aws-sdk");
  const s3 = new aws.S3();
  const { dbUser } = useUserContext();
  const [date, setDate] = useState("");
  const [user, setUser] = useState([]);
  const [postImage, setPostImage] = useState("");

  useMemo(() => {
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
        accessKeyId: "AKIAQK7EQ4DINBSQQM5L",
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
  }, [aws.config, post, s3,dbUser]);
  



  return (
    <>
      <div class="">
        <div class="col-div-6">
          <div class="box-1">
            <div className="image flex flex-col justify-start custom-image-wrapper5">
              <Link href={`/Posts/${post?.slug}`} legacyBehavior>
                <a className="postCol__img">
                  {postImage && (
                    <Image
                      src={postImage || ""}
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
                    post?.category == "OPINIONS"||"ANALYSIS"||"GEOPOL" ? "NEWS" : post?.category
                  }`}
                  legacyBehavior
                >
                  <a className="text-orange-600 hover:text-orange-800  ">
                    {post?.category || "UnKnown"}
                  </a>
                </Link>
                {/* <Link href="/" legacyBehavior>
                  <a className="text-gray-600 hover:text-gray-800 ">
                    {date || "UnKnown"}
                  </a>
                </Link> */}
              </div>
              <div className="title mb-2  text">
                <Link href={`/Posts/${post?.slug}`} legacyBehavior>
                  <a className=" postCol__title text-l font-bold text-gray-800 hover:text-gray-600  ">
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
          <div className="postCol-author">
            {user ? <Author3 author={user} /> : <></>}
          </div>
              
            </div>
          </div>
        </div>

        
      </div>
    </>
  );
}
