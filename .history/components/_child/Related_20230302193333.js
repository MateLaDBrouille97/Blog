import React, { useEffect, useState } from "react";
import { useBlogContext } from "@/contexts/BlogContext";
import Image from "next/image";
import Link from "next/link";


import Error from "./_child/Error";
import Spinner from "./_child/Spinner";
import fetcher from "@/lib/fetcher";

import { useUserContext } from "@/contexts/UserContext";
import { User } from "@/src/models";
import { DataStore } from "aws-amplify";
import Author from "./Author";

export default function Related({post}) {

  const [related,setRelated]=useState([]);
  const {data} =useBlogContext()
  // const { data, isLoading, isError } = fetcher("api/posts");
  useEffect(()=>{
    const dataRelated= data?.filter((value)=>value.category==post?.category);
    setRelated(dataRelated);
  },[])

  // if (isLoading) return <Spinner />;
  // if (isError) return <Error />;

  return (
    <section className="pt-20">
      <div className="flex pb-8 mt-10 mb-20 section1__posts">
        <h1 className="font-bold text-4xl py-8 text-begin section1__posts-title">Related</h1>
      </div>
      
      <div className="flex flex-col gap-10">
      {related && related.slice(0, 5).map((post,index)=>
          (<PostCol post={post} key={post.id}/>)
          )}
      </div>
    </section>
  );
}

 function PostCol({post}) {

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
    <div className="flex gap-5 postCol">
      <div className="image flex flex-col justify-start">
        <Link href={`/Posts/${post?.slug}`} legacyBehavior>
          <a className="postCol__img">
           { postImage&&<Image
              src={postImage||""}
              alt=""
              width={300}
              height={250}
              className=" rounded "
            />}
          </a>
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4">
        <div className="cat flex gap-3">
          <Link href="/" legacyBehavior>
            <a className="text-orange-600 hover:text-orange-800">
            {post?.category || "UnKnown"}
            </a>
          </Link>
          <Link href="/" legacyBehavior>
            <a className="text-gray-600 hover:text-gray-800">{date || "UnKnown"}</a>
          </Link>
        </div>
        <div className="title">
          <Link href={`/Posts/${post?.slug}`} legacyBehavior>
            <a className=" postCol__title text-xl font-bold text-gray-800 hover:text-gray-600">
            {post?.title}
            </a>
          </Link>
        </div>
        {user ? <Author author={user} /> : <></>}
      </div>
    </div>
  );
}
