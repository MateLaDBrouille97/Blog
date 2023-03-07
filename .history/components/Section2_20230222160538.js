import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Author from "./_child/Author";
import img1 from "../public/images/code.jpg";
import getPost from "@/lib/helper";
import fetcher from "@/lib/fetcher";
import Spinner from "./_child/Spinner";
import Error from "./_child/Error";
import { useBlogContext } from "@/contexts/BlogContext";
import { useUserContext } from "@/contexts/UserContext";
import { User } from "@/src/models";


export default function Section2() {

const {data}=useBlogContext();
const{isLoading,isError}=fetcher('api/posts');
if(isLoading)return<Spinner/>
if(isError)return<Error/>
  
  return (
    <section className="container mx-auto md:px-20 py-20">
      <h1 className="font-bold text-4xl py-12 text-center">
        Latest Posts
      </h1>
      {/* grid columns */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
          {data && data.map((post,index)=>
          (<Post post={post} key={post.id}/>)
          )}
          
        </div>
    </section>
  );
}

function Post({post}) {

  const aws = require("aws-sdk");
  const s3 = new aws.S3();
  const { dbUser } = useUserContext();
  const [date, setDate] = useState("");
  const [user,setUser] =useState("");
  const [postImage,setPostImage] =useState("");

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

  useEffect(()=>{
    const fetchUser = async()=>{
      await DataStore.query(User,(user)=>user.id.eq(post?.userID)).then(user=>setUser(user[0]));
      
    }
    fetchUser();
  },[])

 
 
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
      await s3.getSignedUrlPromise("getObject", params).then((i) => setPostImage(i));
    };
    fetchImage();
  }, [dbUser]);



  return (
    <div className="item">
      <div className="images">
        <Link href={`/Posts/${post?.id}`} legacyBehavior>
          <a>
            <Image
              src={post?.img||"/"}
              alt=""
              width={500}
              height={350}
              className="rounded"
            />
          </a>
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4">
        <div className="cat flex gap-6">
          <Link href="/" legacyBehavior>
            <a className="text-orange-600 hover:text-orange-800">
              {post?.category||"UnKnown"}
            </a>
          </Link>
          <Link href="/" legacyBehavior>
            <a className="text-gray-600 hover:text-gray-800">{date||"UnKnown"}</a>
          </Link>
        </div>
        <div className="title">
          <Link href={`/Posts/${post?.id}`} legacyBehavior>
            <a className="text-xl font-bold text-gray-800 hover:text-gray-600">
              {post?.title}
            </a>
          </Link>
        </div>
        <p className="text-gray-500 py-3">
          {post?.description}
        </p>
        {user ? <Author author={user} /> : <></>}
      </div>
    </div>
  );
}
