import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Error from "@/components/_child/Error";
import { useBlogContext } from "@/contexts/BlogContext";
import rehypeSlug from 'rehype-slug'
import { MDXRemote } from 'next-mdx-remote'
import rehypeHighlight from 'rehype-highlight'
import rehypeCodeTitles from 'rehype-code-titles'
import { serialize } from 'next-mdx-remote/serialize'
import 'highlight.js/styles/atom-one-dark-reasonable.css'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { getAllArticles, getArticleFromSlug, getSlug } from "@/src/utils/mdx";
import Format from "@/layout/Format";
import Author from "@/components/_child/Author";
import Image from "next/image";
import Related from "@/components/_child/Related";
import { DataStore } from "aws-amplify";
import { BlogPost, User } from "@/src/models";
import { useUserContext } from "@/contexts/UserContext";

export default function Page({posts}) {
  const router = useRouter();
  const postSlug = router?.query?.PostSlug;
  const { data } = useBlogContext();
  const [post1, setPost] = useState("");
  const [post2, setPost2] = useState("");

  console.log(postSlug)

  useEffect(() => {
    const postsD = async () => {
      if (!router.isReady) return;
      // const posts2 = await getPost();
      const filt = data.filter((value) => value?.slug == postSlug);
      setPost(filt[0]);
      
    };
    postsD();
  }, [postSlug, router.isReady]);

  

  // if (isLoading) return <Spinner />;
  // if (isError) return <Error />;

  return <div>{post1 ? <Article post={post1}  /> : <Error />}</div>;
}



function Article({ post ,post2}) {

  console.log("post2",post2)
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
    accessKeyId: 'AKIAQK7EQ4DINBSQQM5L',
    secretAccessKey: "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"
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
      <React.Fragment>
      <section className="section section__article-postSlug mx-auto md:px-2 py-16 w-1/2">
        <div className="container ">
          <div className=" article__img">
            <Image src={postImage} alt="" width={900} height={800} />
          </div>
          <h1 className="font-bold text-4xl text-begin pb-5 article__title">
            {post?.title}
          </h1>
          <p className="text-gray-500 text-2xl text-begin article__subtitle">
            {" "}
            {post?.subtitle}
          </p>
          <div className="content text-gray-600 text-lg flex flex-col gap-4 article__desc">
            {post?.description}
          </div>
          <p className="article__text">
          {/* <MDXRemote {...source} /> */}
          </p>
        </div>
        <div className="flex justify-end">
          {user ? <Author author={user} /> : <></>}
        </div>
        {post && <Related post={post} />}
      </section>
      </React.Fragment>
    </Format>
  );
}

export async function getStaticProps({ params }) {
  //fetch the particular file based on the slug
  const { PostSlug } = params
  const { content, frontmatter } = await getArticleFromSlug(PostSlug);
   
  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            properties: { className: ['anchor'] },
          },
          { behaviour: 'wrap' },
        ],
        rehypeHighlight,
        rehypeCodeTitles,
      ],
    },
  })
 console.log(mdxSource)
  return {
    props: {
      post2: {
        source: mdxSource,
        frontmatter,
      },
    },
  }
}


export async function getStaticPaths() {
  // getting all paths of each article as an array of
  // objects with their unique slugs
  const paths = (await getSlug()).map((PostSlug) => ({ params: { PostSlug } }))
  
  return {
    paths,
    // in situations where you try to access a path
    // that does not exist. it'll return a 404 page
    fallback: false,
  }
}

