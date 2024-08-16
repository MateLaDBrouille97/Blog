"use client";


import BlogArticleNavbar from "./blogarticle-navbar.jsx";
import BlogArticleSidebar from "./blogarticle-sidebar.jsx";

import { useEffect, useState } from "react";
import { useRouter,useParams } from "next/navigation";

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


import RelatedBA from "../../../../../components/_child/RelatedBA.js";
import ChapterIdPage from "../../../ChapterBAML/chapter.jsx"

import AuthorBA from "../../../../../components/_child/AuthorBA.js";
import AuthorDetailsBA from "../../../../../components/_child/AuthorDetailBA.js";
import Intro from "../../../../../components/Intro/page.jsx"
import Description from "../../../../../components/Description/page.jsx"




// interface OriginalType {
//   blogArt: any;
//   articles: any;
  
// }



function BlogArticle({ blogArt, articles }) {

 
  const params = useParams();

  const BlogArticleId = params.BlogArticleId;

  const [blogArticle, setBlogArticle] = useState(blogArt);
  const [user, setUser] = useState(blogArt?.author);
  // const [image, setImage] = useState("");
  const [category, setCategory] = useState(blogArt?.category?.name);
  const [chapters, setChapters] = useState(blogArt?.chapters);

  const [selectedChapter, setSelectedChapter] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!blogArticle) {
          // const fetchedBlogArticle = await getBlogArticle(BlogArticleId);
          setBlogArticle(blogArt);
          setCategory(blogArt?.category?.name);
          setChapters(blogArt?.chapters);

        }
      } catch (error) {
        console.error("Error fetching blog article:", error);
      }
    };

    const fetchUser = async () => {
      try {
        setUser(blogArt?.author);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchData();
    fetchUser();
  }, [BlogArticleId, blogArt?.author, blogArticle, blogArt]);

  const backgroundImageStyle = {
    backgroundImage: `url(${blogArt?.imageUrl})`,
  };

 

  const handleSelectChapter = (chapter) => {
    // Set the selected chapter in the state
    setSelectedChapter(chapter);
  };

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  const chapter  = blogArticle?.chapters?.[0]

  return (
    <>
      <section className="section section4 mx-auto md:px-20 py-16 lg:w-4/6 md:w-5.25/6">
        <div className="main">
          <Intro post={blogArticle} />
          <Description post={blogArticle} />
        </div>
        <div className="section__cat container-section4">
          {/* <div className="cat flex gap-6 pt-2 pb-2 category__postId">
            <div
              className={
                category == "USEFULHACKS"
                  ? "category__postId3"
                  : "category__postId2"
              }
            ></div>
            <Link
              href={`/Categories/${
                category == "OPINIONS" ||
                category == "ANALYSIS" ||
                category == "GEOPOL"
                  ? "NEWS"
                  : category
              }`}
              legacyBehavior
            >
              <a className="text-white hover:text-black-800 postId-img">
                {category || "UnKnown"} .
              </a>
            </Link>
          </div> */}

          <div className="section__cat container-section4">
            <div className="article__text-social ">
          <ul className="icons-share">
              <FacebookShareButton
                url={`https://blog2-eosin-beta.vercel.app/BlogArticles/${blogArt?.id}`}
                className="social__link-share"
              >
                <FacebookIcon size={30} round={true} />
              </FacebookShareButton>

              <LinkedinShareButton
                url={`https://blog2-eosin-beta.vercel.app/BlogArticles/${blogArt?.id}`}
                className="social__link-share"
              >
                <LinkedinIcon size={30} round={true} />
              </LinkedinShareButton>
              <TwitterShareButton
                url={`https://blog2-eosin-beta.vercel.app/BlogArticles/${blogArt?.id}`}
                className="social__link-share"
              >
                <TwitterIcon size={30} round={true} />
              </TwitterShareButton>
              <WhatsappShareButton
                url={`https://blog2-eosin-beta.vercel.app/BlogArticles/${blogArt?.id}`}
                className="social__link-share"
              >
                <WhatsappIcon size={30} round={true} />
              </WhatsappShareButton>
              <TelegramShareButton
                url={`https://blog2-eosin-beta.vercel.app/BlogArticles/${blogArt?.id}`}
                className="social__link-share"
              >
                <TelegramIcon size={30} round={true} />
              </TelegramShareButton>
          </ul>

            <div className="flex justify-end">
                {user ? <AuthorBA author={user} /> : <></>}
              </div>
            </div>
            <h2 className="article__text content ">
              <div className="h-full flex flex-col ">
                <div className="h-[80px] md:pl-50  inset-y-0 w-full ">
                  {blogArticle && (
                    <BlogArticleNavbar
                      blogarticle={blogArticle}
                      selectedChapter={selectedChapter}
                      onSelectChapter={handleSelectChapter}
                    />
                  )}
                  {/* progressCount={progressCount} */}
                </div>
                {/* <Like4 id={blogArticle?.id} /> */}
                <div className="flex flex-row">
                  <div className="hidden md:flex h-full w-80 flex-col inset-y-0 ">
                    {blogArticle && (
                      <BlogArticleSidebar
                        blogarticle={blogArticle}
                        onSelectChapter={handleSelectChapter}
                      />
                    )}
                    {/* progressCount={progressCount} */}
                  </div>
                  {blogArticle&&<main className="md:pl-8 pt-[-80px] h-full ">
                    {selectedChapter ? (
                      <ChapterIdPage
                        
                        chapterBA={selectedChapter}
                      />
                    ) : (
                      <ChapterIdPage
             
                        chapterBA={chapter}
                      />
                    )}
                  </main>}
                </div>
              </div>
            </h2>

            {/* <hr className="my-10 border-gray-700" /> */}

            {user && <AuthorDetailsBA author={user} />}
            {/* {post2?.frontmatter?.tags.map((tag) => {return(<><div>
          #{tag}
      </div></>)})} */}
          </div>
        </div>
        <div className="">
          {blogArticle && <RelatedBA post={blogArticle} articles={articles} />}
        </div>
      </section>
    </>
  );
}

export default BlogArticle;

// async function getBlogArticle(BlogArticleId) {
//   try {
//     const response = await fetch(`/api/blogArticle?BlogArticleId=${BlogArticleId}`);
//     if (!response.ok) {
//       throw new Error("Failed to fetch data");
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Error fetching blog article:", error);
//     // Handle the error or rethrow it based on your use case.
//     throw error;
//   }
// }
