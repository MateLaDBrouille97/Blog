import Link from "next/link";
import Image from "next/image";
import Author3BA from "./_child/Author3BA";
import React, { useEffect, useState,useMemo } from "react";
import { ArrowRight } from "lucide-react";
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
    <main2 className="flex justify-center items-start">
      <div className="card">
        {postImage && (
          <Image
            src={postImage}
            height={900}
            width={900}
            alt="blog image"
            className="rounded-sm"
          />
        )}
        <div className="card-content ">
          <h3>
            <Link
              href={`/Categories/${
                post?.category == "OPINIONS"||"ANALYSIS"||"GEOPOL" ? "NEWS" : post?.category
              }`}
              legacyBehavior
            >
              <a className="text-orange-900 hover:text-orange-800 color-top">
                {post?.category || "UnKnown"}
              </a>
            </Link>
          </h3>

          <h2>{post?.title?.substring(0, 29) +
                (post?.title?.length >29? "..." : "")}</h2>

          <Link href={`/BlogArticles/${post?.id}`} legacyBehavior>
            <p className="description-element">
              {post?.description?.substring(0, 150) +
                (post?.description?.length > 150 ? "..." : "")}
            </p>
          </Link>

          <a href={`/BlogArticles/${post?.id}`} className="find-out-more">
            Find out more{"   "}
            <span>
              <ArrowRight className="material-symbols-outlined " />
            </span>
          </a>
        </div>
      </div>
    </main2>
  );
};

export default PostsCard;