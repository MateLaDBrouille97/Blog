import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Error from "@/components/_child/Error";
import { useBlogContext } from "@/contexts/BlogContext";
import rehypeSlug from "rehype-slug";
import { MDXRemote } from "next-mdx-remote";
import rehypeHighlight from "rehype-highlight";
import rehypeCodeTitles from "rehype-code-titles";
import { serialize } from "next-mdx-remote/serialize";
// import "highlight.js/styles/atom-one-dark-reasonable.css";
import "highlight.js/styles/atom-one-dark.css";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { getAllArticles, getArticleFromSlug, getSlug } from "@/src/utils/mdx";
import Format from "@/layout/Format";
import Author from "@/components/_child/Author";
import Image from "next/image";
import Related from "@/components/_child/Related";
import { DataStore } from "aws-amplify";
import { BlogPost, User } from "@/src/models";
import { useUserContext } from "@/contexts/UserContext";
import Button from "@/components/_child/Button";
import { gsap } from "gsap";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

import {
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import AuthorDetails from "@/components/_child/AuthorDetail";
// import "highlight.js/styles/atom-one-dark-reasonable.css";
import "highlight.js/styles/atom-one-dark.css";
import Youtube from "@/components/Youtube";
import Para from "@/components/_child/Para";
import Video from "@/components/Video";
import Like from "@/components/Like";
import Like2 from "@/components/Like2";

const components = { Image, Button, Youtube, Para, Video };

export default function Page({ post2 }) {
  const router = useRouter();
  const postSlug = router?.query?.PostSlug;
  const { data } = useBlogContext();
  const [post1, setPost] = useState([]);
  const aws = require("aws-sdk");
  const s3 = new aws.S3();
  const [postImage, setPostImage] = useState();
  const [img, setImg] = useState([]);
  const { dbUser } = useUserContext();

  /* Fetch Image */
  aws.config.update({
    accessKeyId: "AKIAQK7EQ4DINBSQQM5L",
    secretAccessKey: "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",
  });

  useEffect(() => {
    const fetchImage = async () => {
      const params = {
        Bucket: "portfolioml26151fd83d4a40cb89e358a0b8c234d582358-staging",
        Key: img ? img : post1?.image,
      };
      await s3
        .getSignedUrlPromise("getObject", params)
        .then((i) => setPostImage(i));
    };
    fetchImage();
  }, [dbUser, router.isReady, post1]);

  useMemo(() => {
    const postsD = async () => {
      if (!router.isReady) return;
      // const posts2 = await getPost();
      const filt = await data.filter((value) => value?.slug == postSlug);
      setPost(filt[0]);
      setImg(filt?.[0]?.image);
    };
    postsD();
  }, [postSlug, router.isReady, data]);

  // if (isLoading) return <Spinner />;
  // if (isError) return <Error />;

  return (
    <div>
      {post1 && postImage ? (
        <Article image={postImage} post={post1} post2={post2} />
      ) : (
        <Error />
      )}
    </div>
  );
}

function Article({ image, post, post2 }) {
  const [date, setDate] = useState("");
  const [user, setUser] = useState("");
  const [quantity, setQuantity] = useState(0);

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

  //Router animation
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    let timer;
    const aniStart = async () => {
      timer = setTimeout(() => {
        setIsActive(true);
        const tl = gsap.timeline();
        tl.to(".cover-strip", {
          yPercent: 100,
          duration: 0.8,
          ease: "Expo.easeInOut",
          stagger: 0.1,
        });
      }, 300);
    };
    const aniEnd = () => {
      if (timer) {
        clearTimeout(timer);
      }
      const tl = gsap.timeline();
      if (isActive) {
        tl.to(".cover-strip", {
          yPercent: 200,
          duration: 0.8,
          ease: "Expo.easeInOut",
          stagger: -0.1,
        });
        setIsActive(false);
      }

      tl.set(".cover-strip", { yPercent: 0 });
      clearTimeout(timer);
    };

    router.events.on("routeChangeStart", aniStart);
    router.events.on("routeChangeComplete", aniEnd);
    router.events.on("routeChangeError", aniEnd);

    return () => {
      router.events.off("routeChangeStart", aniStart);
      router.events.off("routeChangeComplete", aniEnd);
      router.events.off("routeChangeError", aniEnd);
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [router]);

  const backgroundImageStyle = {
    backgroundImage: `url(${image})`,
  };

  return (
    <Format>
      <div className="flex flex-col overflow-hidden relative z-50">
        <div
          id="cover"
          className="cover-strip h-screen w-3/12 bg-slate-50  top-0 left-0 cover fixed"
        ></div>
        <div
          id="cover1"
          className="cover-strip h-screen w-3/12 bg-slate-100 fixed top-0 left-1/4 cover"
        ></div>
        <div
          id="cover2"
          className="cover-strip h-screen w-3/12 bg-slate-200 fixed top-0 left-2/4 cover"
        ></div>
        <div
          id="cover3"
          className="cover-strip h-screen w-3/12 bg-slate-300 fixed top-0 left-3/4 cover"
        ></div>
      </div>
      <section className="section mx-3 ">
        <div className="section__article-postSlug mx-auto md:px-2 py-16 lg:w-4/6 md:w-5.5/6 ">
          <div className="container ">
            <div className="post__article-blog" style={backgroundImageStyle} />
            <div className=" article__img">
              <Image src={image} alt="" width={900} height={800} />
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
            <p className="article__text-social">
              <ul className="icons-share">
                <FacebookShareButton
                  url={`https://main.d6iszn1o7sirg.amplifyapp.com/Posts/${post?.slug}`}
                  className="social__link-share"
                >
                  <FacebookIcon size={30} round={true} />
                </FacebookShareButton>

                <LinkedinShareButton
                  url={`https://main.d6iszn1o7sirg.amplifyapp.com/Posts/${post?.slug}`}
                  className="social__link-share"
                >
                  <LinkedinIcon size={30} round={true} />
                </LinkedinShareButton>
                <TwitterShareButton
                  url={`https://main.d6iszn1o7sirg.amplifyapp.com/Posts/${post?.slug}`}
                  className="social__link-share"
                >
                  <TwitterIcon size={30} round={true} />
                </TwitterShareButton>
                <WhatsappShareButton
                  url={`https://main.d6iszn1o7sirg.amplifyapp.com/Posts/${post?.slug}`}
                  className="social__link-share"
                >
                  <WhatsappIcon size={30} round={true} />
                </WhatsappShareButton>
                <TelegramShareButton
                  url={`https://main.d6iszn1o7sirg.amplifyapp.com/Posts/${post?.slug}`}
                  className="social__link-share"
                >
                  <TelegramIcon size={30} round={true} />
                </TelegramShareButton>
              </ul>

              <div className="flex justify-end">
                {user ? <Author author={user} /> : <></>}
              </div>
            </p>
            <h2 className="article__text content">
              <MDXRemote {...post2?.source} components={components} />
            </h2>
          </div>
          {/* <hr className="my-10 border-gray-700" /> */}
          <Like2 id={post?.id} />
          {user && <AuthorDetails author={user} />}
          {/* {post2?.frontmatter?.tags.map((tag) => {return(<><div>
            #{tag}
        </div></>)})} */}
          <div className="">{post && <Related post={post} />}</div>
        </div>
      </section>
    </Format>
  );
}

export async function getStaticProps({ params }) {
  //fetch the particular file based on the slug
  // await waitload(2);
  const { PostSlug } = params;
  const { content, frontmatter } = await getArticleFromSlug(PostSlug);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            properties: { className: ["anchor"] },
          },
          { behaviour: "wrap" },
        ],
        rehypeHighlight,
        rehypeCodeTitles,
      ],
    },
  });

  return {
    props: {
      post2: {
        source: mdxSource,
        frontmatter,
      },
    },
  };
}

export async function getStaticPaths() {
  // getting all paths of each article as an array of
  // objects with their unique slugs
  const paths = (await getSlug()).map((PostSlug) => ({ params: { PostSlug } }));

  return {
    paths,
    // in situations where you try to access a path
    // that does not exist. it'll return a 404 page
    fallback: false,
  };
}

// function waitload(sec) {
//   return new Promise((resolve) => setTimeout(resolve, sec * 1000));
// }
