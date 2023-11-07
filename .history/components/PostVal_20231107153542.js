import Image from "next/image";

import React, { useEffect, useState } from "react";

import { useUserContext } from "@/contexts/UserContext";
import { User } from "@/src/models";
import { DataStore } from "aws-amplify";

import { Icon } from "@iconify/react";

const PostVal = ({ post }) => {
  const aws = require("aws-sdk");
  const s3 = new aws.S3();
  const { dbUser } = useUserContext();
  const [date, setDate] = useState("");
  const [user, setUser] = useState("");
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
   
    <div className="post" key={post.id}>
      
        <div className="img5">
          {postImage && (
            <Image
              src={postImage || ""}
              alt=""
              width={300}
              height={250}
              className="rounded img"
            />
          )}
        </div>
        <div className="content">
          <h1 className="postCol__title2">{post.title}</h1>

          <a className="postCol__description2 text-m  text-gray-800 hover:text-gray-600 mt-10">
            {post?.description}
          </a>
      
          <a  
          href={post?.href}
          className="work__button">
            View Project{" "}
            <Icon
              icon="bx:right-arrow-alt"
              className=" work__button-icon"
            >

            </Icon>
          </a>
        
        </div>
      
    </div>
  );
};

export default PostVal;
