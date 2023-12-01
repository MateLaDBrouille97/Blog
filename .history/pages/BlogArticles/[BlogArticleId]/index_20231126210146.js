// import { auth } from "@clerk/nextjs";
// import { redirect } from "next/navigation";
import { User } from "../../../src/models";
// import Error2 from "../../../components/_child/Error2";
import BlogArticleNavbar from "./_components/blogarticle-navbar";
import BlogArticleSidebar from "./_components/blogarticle-sidebar";
import Format from "../../../layout/Format";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DataStore } from "aws-amplify";
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

import Link from "next/link";
import Author from "../../../components/_child/Author";
import Image from "next/image";
import AuthorDetails from "../../../components/_child/AuthorDetail";
import Like4 from "../../../components/Like4";
import RelatedBA from "../../../components/_child/RelatedBA";
import ChapterIdPage from "../../ChaptersBA/index";
import { API_URL } from "../../../config/index";

export async function getServerSideProps({ params }) {
  const { BlogArticleId } = params;
  const response = await fetch(
    `${API_URL}/api/getBlogArticle?BlogArticleId=${BlogArticleId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data in category");
  }
  const blogArt = await response.json();

  const response2 = await fetch(`${API_URL}/api/getBlogArticles`);
  if (!response2.ok) {
    throw new Error(`Failed to fetch total data in ${BlogArticleId}`);
  }
  const articles = await response.json();

  return { props: { blogArt,articles } };
}



function BlogArticleLayout({ blogArt,articles }) {
  //   const { userId } = auth();
  const router = useRouter();
  console.log(articles)
  const BlogArticleId = router?.query?.BlogArticleId;

  const [blogArticle, setBlogArticle] = useState();
  const [user, setUser] = useState("");
  // const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [chapters, setChapters] = useState();

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
        const fetchedUser = await DataStore.query(User, (user) =>
          user.email.eq(blogArticle?.author?.email)
        );
        setUser(fetchedUser[0]);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchData();
    fetchUser();
  }, [BlogArticleId, router, blogArticle?.author, blogArticle, blogArt]);

  const backgroundImageStyle = {
    backgroundImage: `url(${blogArticle?.imageUrl})`,
  };

  const [selectedChapter, setSelectedChapter] = useState();

  const handleSelectChapter = (chapter) => {
    // Set the selected chapter in the state
    setSelectedChapter(chapter);
  };

  return (
    <Format>
      <section className="section  mt-20 section section4 mx-auto md:px-20 py-16 lg:w-4/6 md:w-5.25/6 ">
        <div className="container-section4 ">
          <div className="cat flex gap-6 pt-2 pb-2 category__postId">
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
          </div>
          <div className="section__cat container-section4">
            <div className="post__article-blog" style={backgroundImageStyle} />

            <div className="custom-image-wrapper10">
              <div className=" article__img ">
                <Image
                  src={blogArticle?.imageUrl}
                  alt=""
                  width={900}
                  height={900}
                  className=" postCol__img2 "
                />
              </div>
            </div>
            <h1 className="font-bold text-4xl text-begin pb-5 article__title">
              {blogArticle?.title}
            </h1>
            <p className="text-gray-500 text-2xl text-begin article__subtitle">
              {" "}
              {blogArticle?.subtitle}
            </p>
            <div className="content text-gray-600 text-lg flex flex-col gap-4 article__desc">
              {blogArticle?.description}
            </div>
            <p className="article__text-social">
              <ul className="icons-share">
                <FacebookShareButton
                  url={`https://main.d6iszn1o7sirg.amplifyapp.com/BlogArticles/${blogArticle?.id}`}
                  className="social__link-share"
                >
                  <FacebookIcon size={30} round={true} />
                </FacebookShareButton>

                <LinkedinShareButton
                  url={`https://main.d6iszn1o7sirg.amplifyapp.com/BlogArticles/${blogArticle?.id}`}
                  className="social__link-share"
                >
                  <LinkedinIcon size={30} round={true} />
                </LinkedinShareButton>
                <TwitterShareButton
                  url={`https://main.d6iszn1o7sirg.amplifyapp.com/BlogArticles/${blogArticle?.id}`}
                  className="social__link-share"
                >
                  <TwitterIcon size={30} round={true} />
                </TwitterShareButton>
                <WhatsappShareButton
                  url={`https://main.d6iszn1o7sirg.amplifyapp.com/BlogArticles/${blogArticle?.id}`}
                  className="social__link-share"
                >
                  <WhatsappIcon size={30} round={true} />
                </WhatsappShareButton>
                <TelegramShareButton
                  url={`https://main.d6iszn1o7sirg.amplifyapp.com/BlogArticles/${blogArticle?.id}`}
                  className="social__link-share"
                >
                  <TelegramIcon size={30} round={true} />
                </TelegramShareButton>
              </ul>

              <div className="flex justify-end">
                {user ? <Author author={user} /> : <></>}
              </div>
            </p>
            <h2 className="article__text content ">
              <div className="h-full ">
                <div className="h-[80px] md:pl-50  inset-y-0 w-full ">
                  {blogArticle && (
                    <BlogArticleNavbar
                      blogarticle={blogArticle}
                      selectedChapter={selectedChapter}
                    />
                  )}
                  {/* progressCount={progressCount} */}
                </div>
                <div className="hidden md:flex h-full w-80 flex-col inset-y-0">
                  {blogArticle && (
                    <BlogArticleSidebar
                      blogarticle={blogArticle}
                      onSelectChapter={handleSelectChapter}
                    />
                  )}
                  {/* progressCount={progressCount} */}
                </div>
                <main className="md:pl-80 pt-[-80px] h-full ">
                  {selectedChapter ? (
                    <ChapterIdPage
                      blogarticleId={blogArticle?.id}
                      chapterBA={selectedChapter}
                    />
                  ) : (
                    <ChapterIdPage
                      blogarticleId={blogArticle?.id}
                      chapterBA={blogArticle?.chapters?.[0]}
                    />
                  )}
                </main>
              </div>
            </h2>

            {/* <hr className="my-10 border-gray-700" /> */}
            <Like4 id={blogArticle?.id} />
            {user && <AuthorDetails author={user} />}
            {/* {post2?.frontmatter?.tags.map((tag) => {return(<><div>
          #{tag}
      </div></>)})} */}
          </div>
        </div>
        <div className="">
          {blogArticle && <RelatedBA post={blogArticle} articles={articles}/>}
        </div>
      </section>
    </Format>
  );
}

export default BlogArticleLayout;

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
