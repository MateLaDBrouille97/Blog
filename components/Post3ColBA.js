import Author from "./_child/Author";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { useUserContext } from "../contexts/UserContext";
import { DataStore } from "aws-amplify";
import { User } from "../src/models";
import Spinner from "./_child/Spinner";
import Like3 from "./Like3";

export default function Post3colBA({ postBA }) {
    // const aws = require("aws-sdk");
    // const s3 = new aws.S3();
    // const { dbUser } = useUserContext();
    // const [date, setDate] = useState("");
    const [user, setUser] = useState("");
    // const [postImage, setPostImage] = useState("");
  
    // useEffect(() => {
    //   const convertAwsDateToDate = (awsDate) => {
    //     const year = awsDate.substring(0, 4);
    //     const month = awsDate.substring(5, 7) - 1; // Subtract 1 since months are zero-indexed
    //     const day = awsDate.substring(8, 10);
    //     const newDate = new Date(year, month, day).toLocaleDateString();
    //     setDate(newDate);
    //   };
    //   convertAwsDateToDate(postBA?.createdAt);
    // }, [postBA]);
  
    useEffect(() => {
      const fetchUser = async () => {
        
        await DataStore.query(User, (user) => user.email.eq(postBA?.author?.email)).then(
          (user) => setUser(user[0])
        );
      };
      fetchUser();
    }, [postBA?.author]);
  
    // /* Fetch Image */
    // aws.config.update({
    //   accessKeyId: "AKIAQK7EQ4DINBSQQM5L",
    //   secretAccessKey: "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",
    // });
  
    // useEffect(() => {
    //   const fetchImage = async () => {
    //     const params = {
    //       Bucket: "portfolioml26151fd83d4a40cb89e358a0b8c234d582358-staging",
    //       Key: postBA?.image,
    //     };
    //     await s3
    //       .getSignedUrlPromise("getObject", params)
    //       .then((i) => setPostImage(i));
    //   };
    //   fetchImage();
    // }, [dbUser]);
  
    return (
      <div className="item postCol3-container ">
        <div className='custom-image-wrapper'>
          <Link href={`/BlogArticles/${postBA?.id}`} legacyBehavior>
            <a className="postCol__img">
              {!postBA?.imageUrl ? (
                <Spinner />
              ) : (
                <Image
                  src={postBA?.imageUrl || "/"}
                  alt=""
                  width={350}
                  height={200}
                  className="rounded postCol__img custom-image"
                />
              )}
            </a>
          </Link>
        </div>
        <div className="info flex justify-center flex-col py-4">
          <div className="cat flex gap-6 pt-2 pb-2">
            <Link
              href={`/Categories/${
                postBA?.category?.name == "OPINIONS"||"ANALYSIS"||"GEOPOL" ? "NEWS" : postBA?.category?.name
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
          <div className="title post3col-title">
            <Link href={`/BlogArticles/${postBA?.id}`} legacyBehavior>
              <a className="text-3xl font-bold text-gray-800 hover:text-gray-600 ">
                {postBA?.title}
              </a>
            </Link>
          </div>
          <div className="postCol3-description">
            <p className="text-gray-500 py-3 ">{postBA?.description}</p>
          </div>
          <div>
            {user ? <Author author={user} /> : <></>}
            <div className="slide__end-bar">
              <Like3 id={postBA?.id} />
            </div>
          </div>
        </div>
      </div>
    );
  }