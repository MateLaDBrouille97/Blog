import Author from "../components/_child/Author";
import Image from "next/image";
import React, { useEffect, useState,useMemo } from "react";
import Link from "next/link";

import { useUserContext } from "../contexts/UserContext";
import { DataStore } from "aws-amplify";
import { User } from "../src/models";
import Spinner from "./_child/Spinner";
import Like3 from "./Like3";
import {  getUser} from "../src/graphql/queries"
import { API, graphqlOperation } from 'aws-amplify';

export default function Post3col({ post }) {
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
        const user = await API.graphql({
          query: getUser,
          variables: { id: post?.userID }
        });
        setUser(user.data?.getUser)

      
    
        aws.config.update({
          accessKeyId: "AKIA3PIVPEUBT5DCEEPV",
    secretAccessKey: "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",
    region: 'us-east-2',
        });

        const params = {
          Bucket: "portfolio-manulab-storage-878e139522942-staging",
          Key: post?.image,
        };
        await s3
          .getSignedUrlPromise("getObject", params)
          .then((i) => setPostImage(i));
      };
    
      fetchUserAndImage();
    }, [aws.S3, aws.config, post, s3]);
    


  
    /* Fetch Image */
    // useEffect(() => {
    //   const fetchImage = async () => {
    //     aws.config.update({
    //       accessKeyId: "AKIAQK7EQ4DINBSQQM5L",
    //       secretAccessKey: "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",
    //     });
    
    //     const params = {
    //       Bucket: "portfolioml26151fd83d4a40cb89e358a0b8c234d582358-staging",
    //       Key: post?.image,
    //     };
    //     await s3
    //       .getSignedUrlPromise("getObject", params)
    //       .then((i) => setPostImage(i));
    //   };
    
    //   fetchImage();
    // }, [dbUser, post]);
    
  
    return (
      <div className="item postCol3-container ">
        <div className='custom-image-wrapper'>
          <Link href={`/Posts/${post?.slug}`} legacyBehavior>
            <a className="postCol__img">
              {!postImage ? (
                <Spinner />
              ) : (
                <Image
                  src={postImage || "/"}
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
                post?.category == "OPINIONS"||"ANALYSIS"||"GEOPOL" ? "NEWS" : post?.category
              }`}
              legacyBehavior
            >
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
          <div className="title post3col-title">
            <Link href={`/Posts/${post?.slug}`} legacyBehavior>
              <a className="text-3xl font-bold text-gray-800 hover:text-gray-600 ">
                {post?.title}
              </a>
            </Link>
          </div>
          <div className="postCol3-description">
            <p className="text-gray-500 py-3 ">
            {post?.description?.substring(0, 150)+(post?.description?.length > 150 ? "..." : "")}
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