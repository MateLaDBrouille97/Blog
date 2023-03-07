import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import img1 from "../public/images/code.jpg";
import Author from "./_child/Author";
import Error from "./_child/Error";
import Spinner from "./_child/Spinner";
import fetcher from "@/lib/fetcher";
import { useBlogContext } from "@/contexts/BlogContext";
import { useUserContext } from "@/contexts/UserContext";
import { User } from "@/src/models";
import { DataStore } from "aws-amplify";

export default function Section4() {

  const {blogUFH,
    blogP,
    blogN,
    data}=useBlogContext();

  const { isLoading, isError } = fetcher("api/posts");
  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  // const dataC =data?.filter((post)=>post.Category=="Code");
 
  // const dataP =data?.filter((post)=>post.Category=="Project");

  return (
    <section className="container mx-auto md:px-20 py-16">
      <div className="grid lg:grid-cols-2 ">
        <div className="item">
          <h1 className="font-bold text-4xl py-12 text-center">Projects</h1>
          <div className="flex flex-col gap-6">
            {/* Post */}
            {blogP? blogP.slice(0, 5).map((post,index)=>(<Post post={post} key={post.id}/>)):<></>}
          </div>
        </div>
        <div className="item">
          <h1 className="font-bold text-4xl py-12 text-center">IT News</h1>
          <div className="flex flex-col gap-6">
            {/* Post */}
            {blogN? blogN.slice(0, 5).map((post,index)=>(<Post post={post} key={post.id}/>)):<></>}
          </div>
        </div>
      </div>
    </section>
  );
}

function Post({post}) {

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
    <div className="flex gap-5">
      <div className="image flex flex-col justify-start">
        <Link href={`/Posts/${post?.id}`} legacyBehavior>
          <a>
            <Image
              src={postImage}
              alt=""
              width={300}
              height={250}
              className="rounded"
            />
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
          <Link href={`/Posts/${post?.id}`} legacyBehavior>
            <a className="text-xl font-bold text-gray-800 hover:text-gray-600">
            {post?.title}
            </a>
          </Link>
        </div>
        {user ? <Author author={user} /> : <></>}
      </div>
    </div>
  );
}
