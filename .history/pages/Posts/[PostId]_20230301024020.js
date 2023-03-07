import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Error from "@/components/_child/Error";
import { useBlogContext } from "@/contexts/BlogContext";

import { getAllArticles } from "@/src/utils/mdx";
import Format from "@/layout/Format";
import Author from "@/components/_child/Author";
import Image from "next/image";
import Related from "@/components/_child/Related";
import { DataStore } from "aws-amplify";
import { BlogPost, User } from "@/src/models";
import { useUserContext } from "@/contexts/UserContext";

export default function Page({posts}) {
  const router = useRouter();
  const postId = router?.query?.PostId;
  const { data } = useBlogContext();
  const [post, setPost] = useState("");
  const [post2, setPost2] = useState("");
  console.log("posts",posts)
  console.log(data)


  useEffect(() => {
    const postsD = async () => {
      if (!router.isReady) return;
      // const posts2 = await getPost();
      const filt = data.filter((value) => value.id == postId);
      setPost(filt[0]);
      const filt2 = posts?.filter((post1) => post1?.title == post?.title );
      setPost2(filt2[0])
    };
    postsD();
  }, [postId, router.isReady]);

  // if (isLoading) return <Spinner />;
  // if (isError) return <Error />;
   
  

  return <div>{post ? <Article post={post} /> : <Error />}</div>;
}




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
       
        <div className="post ">
          
          <div className=" article__img">
            <Image src={postImage} alt="" width={900} height={800} />
          </div>
          <h1 className="font-bold text-4xl text-begin pb-5">{post?.title}</h1>
          <p className="text-gray-500 text-2xl text-begin"> {post?.subtitle}</p>
          <div className="content text-gray-600 text-lg flex flex-col gap-4 article__desc">
            {post?.description}
          </div>
          <p>

          </p>
        </div>
        <div className="flex justify-end">
        {user ? <Author author={user} /> : <></>}
        </div>
        {post&&<Related post={post}/>}
      </section>
    </Format>
  );
}


















export async function getStaticProps() {
  
  const articles = await getAllArticles()
  console.log(articles)

  articles
    .map((article) => article.data)
    .sort((a, b) => {
      if (a.data.publishedAt > b.data.publishedAt) return 1
      if (a.data.publishedAt < b.data.publishedAt) return -1

      return 0
    })

  return {
    props: {
      posts: articles.reverse(),
    },
  }
}

export async function getStaticPaths ()  {

  return {
      paths: [], //indicates that no page needs be created at build time
      fallback: 'blocking' //indicates the type of fallback
  }
}