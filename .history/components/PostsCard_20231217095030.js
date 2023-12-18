import Link from "next/link";
import Image from "next/image";
import Author3BA from "./_child/Author3BA";
import React, { useEffect, useState,useMemo } from "react";

import { useUserContext } from "../contexts/UserContext";
import { User } from "../src/models";
import { DataStore } from "aws-amplify";

const PostsCard = ({ post, index }) => {

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
    }, [aws.config, post, s3,dbUser]);
    


  return (
    <Link href={`/BlogArticles/${post?.id}`} legacyBehavior>
      <div
        key={index}
        className="dark:bg-dark rounded-sm overflow-hidden shadow-xl"
      >
        <div className="w-full flex">
          <Image
            src={post?.imageUrl}
            height={900}
            width={900}
            alt="blog image"
            className="rounded-sm"
          />
        </div>

        <div className="p-3">
          <div className="px-3 inline-block text-gray-50 bg-sky-400 rounded-md whitespace-nowrap ">
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
          </div>
          <Link href={`/BlogArticles/${post?.id}`} legacyBehavior>
          <div className="text-xl mt-3 text-gray-900 font-bold dark:text-white">
            {post.title}
          </div>
          </Link>
          <p className="mt-3 dark:text-white text-gray-900 text-sm">
            {post.description.substring(0, 150) +
              (post.description.length > 150 ? "..." : "")}
          </p>

          <div className="flex mt-3 gap-3 items-center">
          {user ? <Author3BA author={user} /> : <></>}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PostsCard;