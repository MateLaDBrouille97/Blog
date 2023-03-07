
import React, { useEffect, useState } from "react";
import Format from "@/layout/Format";
import Author from "@/components/_child/Author";
import Image from "next/image";
import Related from "@/components/_child/Related";

import helper from "lib/helper";
import getPost from "lib/helper";
import fetcher from "@/lib/fetcher";
import { useRouter } from "next/router";
import Spinner from "@/components/_child/Spinner";
import Error from "@/components/_child/Error";
import { SWRConfig } from "swr";
import { useBlogContext } from "@/contexts/BlogContext";
import { DataStore } from "aws-amplify";
import { BlogPost, User } from "@/src/models";
import { useUserContext } from "@/contexts/UserContext";

function Article({ post }) {
  
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
      <Format>
        <section className="container mx-auto md:px-2 py-16 w-1/2">
         
          <div className="post py-10">
            <h1 className="font-bold text-4xl text-center pb-5">{post?.title}</h1>
            <p className="text-gray-500 text-xl text-center"> {post?.subtitle}</p>
            <div className="py-10">
              <Image src={postImage} alt="" width={900} height={600} />
            </div>
            
            <div className="content text-gray-600 text-lg flex flex-col gap-4">
              {post?.description}
            </div>
          </div>
          <div className="flex justify-end">
          {user ? <Author author={user} /> : <></>}
          </div>
          {post&&<Related post={post}/>}
        </section>
      </Format>
    );
  }

