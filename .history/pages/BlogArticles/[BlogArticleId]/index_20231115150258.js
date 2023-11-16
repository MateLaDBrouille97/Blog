// import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { User } from "../../../src/models";
import Error2 from "../../../components/_child/Error2";
import { BlogArticleSidebar } from "./_components/blogarticle-sidebar";
import { BlogArticleNavbar } from "./_components/blogarticle-navbar";
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
import ChapterIdPage from "../../../pages/BlogArticles/[BlogArticleId]/chapters/[ChapterId]/page";

function BlogArticleLayout({ children }) {
  //   const { userId } = auth();
  const router = useRouter();

  const BlogArticleId = router?.query?.BlogArticleId;

  const [blogArticle, setBlogArticle] = useState();
  const [user, setUser] = useState("");
  // const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (!blogArticle) {
      const fetchData = async () => {
        const blogarticle = await getBlogArticle(BlogArticleId);
        setBlogArticle(blogarticle);
        setImage(blogarticle?.imageUrl);
        setCategory(blogarticle?.category?.name);
      };
      fetchData();
    }
  }, [BlogArticleId, blogArticle?.chapters, router]);
  

  useEffect(() => {
    const fetchUser = async () => {
      await DataStore.query(User, (user) =>
        user.email.eq(blogArticle?.author?.email)
      ).then((user) => setUser(user[0]));
    };
    fetchUser();
  }, [blogArticle?.author]);

  const backgroundImageStyle = {
    backgroundImage: `url(${blogArticle?.imageUrl})`,
  };
  
  

  const [chapterId,setChapterId]=useState(null)
  const [selectedChapterId, setSelectedChapterId] = useState(null);



  const handleSelectChapter = (chapterId) => {
    // Set the selected chapter id in the state
    setSelectedChapterId(chapterId);
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
                category == "OPINIONS" || "ANALYSIS" || "GEOPOL"
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
            <div
              className="post__article-blog"
              style={backgroundImageStyle}
            />
            <div className=" article__img ">
              <Image
                src={blogArticle?.imageUrl}
                alt=""
                width={900}
                height={800}
              />
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
                    <BlogArticleNavbar blogarticle={blogArticle} />
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
                  {selectedChapterId ? (
                    <ChapterIdPage
                      blogarticleId={blogArticle?.id}
                      chapterId={selectedChapterId}
                    />
                  ): <ChapterIdPage
                  blogarticleId={blogArticle?.id}
                  chapterId={blogArticle?.chapters?.[0].id}
                />}
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
        <div className="">{blogArticle && <RelatedBA post={blogArticle} />}</div>
      </section>
    </Format>
  );
}

export default BlogArticleLayout;

async function getBlogArticle(BlogArticleId) {
  const response = await fetch(
    `/api/blogArticle?BlogArticleId=${BlogArticleId}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const article = await response.json();
  return article;
}