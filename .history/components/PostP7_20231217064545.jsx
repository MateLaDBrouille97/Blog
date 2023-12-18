import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState,useMemo } from "react";

import { useUserContext } from "../contexts/UserContext";
import { User } from "../src/models";
import { DataStore } from "aws-amplify";

import Author3 from "./_child/Author3";

export default function PostP7({ post }) {
  const aws = require("aws-sdk");
  const s3 = new aws.S3();
  const { dbUser } = useUserContext();
  const [date, setDate] = useState("");
  const [user, setUser] = useState([]);
  const [postImage, setPostImage] = useState("");

  useEffect(() => {
    const convertAwsDateToDate = (awsDate) => {
      const year = awsDate?.substring(0, 4);
      const month = awsDate?.substring(5, 7) - 1; // Subtract 1 since months are zero-indexed
      const day = awsDate?.substring(8, 10);
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


  useEffect(() => {
    const fetchImage = async () => {

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
    fetchImage();
  }, [post?.image, s3]);

  return (
    <>
      <div className="container3">
        <div className="col-div-6">
          <div className="box-1">
            <div className="image flex flex-col justify-start custom-image-wrapper4">
              <Link href={`/Posts/${post?.slug}`} legacyBehavior>
                <a className="postCol__img">
                  {postImage && (
                    <Image
                      src={postImage || ""}
                      alt=""
                      width={600}
                      height={500}
                      className=" rounded postCol__img custom-image4"
                    />
                  )}
                </a>
              </Link>
            </div>

            <div className="info flex justify-center flex-col py-4 m-3">
              <div className="cat flex gap-3 mb-4 ">
                <Link
                  href={`/Categories/${
                    post?.category == "OPINIONS"||"ANALYSIS"||"GEOPOL" ? "NEWS" : post?.category
                  }`}
                  legacyBehavior
                >
                  <a className="text-orange-600 hover:text-orange-800 ">
                    {post?.category || "UnKnown"}
                  </a>
                </Link>
                <Link href="/" legacyBehavior>
                  <a className="text-gray-600 hover:text-gray-800 ">
                    {date || "UnKnown"}
                  </a>
                </Link>
              </div>
              <div className="title mb-2  text">
                <Link href={`/Posts/${post?.slug}`} legacyBehavior>
                  <a className=" postCol__title2 text-2xl font-bold text-gray-800 hover:text-gray-600  ">
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
              <div className="postCol-author2">
                {user ? <Author3 author={user} /> : <></>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
