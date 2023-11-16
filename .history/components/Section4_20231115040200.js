
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { useBlogContext } from "../contexts/BlogContext";

import { gsap } from "gsap";
import { useRouter } from "next/router";

import PostColMultiple2 from "./PostColMultiple2";

export default function Section4() {
  const { blogP, blogN, blogO, blogA,blogG } = useBlogContext();

  // //Sort from newest to oldest
  // const [dataSort, setDataSort] = useState([]);
  // const [dataSort2, setDataSort2] = useState([]);
  // const [dataSort3, setDataSort3] = useState([]);
  // const [dataSort4, setDataSort4] = useState([]);
  // const [dataSort5, setDataSort5] = useState([]);
  // // const [dataSlice, setDataSlice] = useState([]);

  // useEffect(() => {
  //   const data1 = blogP.sort((a, b) => {
  //     if (b.createdAt > a.createdAt) return 1;
  //     if (b.createdAt < a.createdAt) return -1;
  //     return 0;
  //   });
  //   const data2 = blogN.sort((a, b) => {
  //     if (b.createdAt > a.createdAt) return 1;
  //     if (b.createdAt < a.createdAt) return -1;
  //     return 0;
  //   });
  //   const data3 = blogO.sort((a, b) => {
  //     if (b.createdAt > a.createdAt) return 1;
  //     if (b.createdAt < a.createdAt) return -1;
  //     return 0;
  //   });
  //   const data4 = blogA.sort((a, b) => {
  //     if (b.createdAt > a.createdAt) return 1;
  //     if (b.createdAt < a.createdAt) return -1;
  //     return 0;
  //   });
  //   const data5 = blogG.sort((a, b) => {
  //     if (b.createdAt > a.createdAt) return 1;
  //     if (b.createdAt < a.createdAt) return -1;
  //     return 0;
  //   });
  //   setDataSort(data1);
  //   setDataSort2(data2);
  //   setDataSort3(data3);
  //   setDataSort4(data4);
  //   setDataSort5(data5);
  // }, [blogP, blogN, blogO, blogA, blogG]);

  // useEffect(() => {
  //   const dat1 = dataSort2.slice(0, 3);
  //   const dat2 = dataSort3.slice(0, 3);
  //   const slice = [...dat1, ...dat2];
  //   setDataSlice(slice);
  // }, [blogN, blogO, dataSort2, dataSort3]);

  // const { isLoading, isError } = fetcher("api/posts");
  // if (isLoading) return <Spinner />;
  // if (isError) return <Error />;

  // const dataC =data?.filter((post)=>post.Category=="Code");

  // const dataP =data?.filter((post)=>post.Category=="Project");

  //Router animation
  
  const [blogArticle, setBlogArticle] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchDataSorted = async () => {
      try {
        const blogArt = await getBlogArticles();
        setBlogArticle(blogArt);

        // Combine and filter categories
        const combinedPosts = {
          USEFULHACKS: filterArticlesByCategory(blogArt, "USEFULHACKS"),
          PROJECTS: filterArticlesByCategory(blogArt, "PROJECTS"),
          NEWS: filterArticlesByCategory(blogArt, "NEWS"),
          ANALYSIS: filterArticlesByCategory(blogArt, "ANALYSIS"),
          OPINIONS: filterArticlesByCategory(blogArt, "OPINIONS"),
          GEOPOL: filterArticlesByCategory(blogArt, "GEOPOL"),
        };

        setFilteredPosts(combinedPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state if necessary
      }
    };

    fetchDataSorted();
  }, []);

  const trending = useMemo(() => {
    const mergeAndSort = (category) => {
      let Ba;
      switch (category) {
        case "USEFULHACKS":
          Ba = blogUFH;
          break;
        case "PROJECTS":
          Ba = blogP;
          break;
        case "NEWS":
          Ba = blogN;
          break;
        case "ANALYSIS":
          Ba = blogA;
          break;
        case "OPINIONS":
          Ba = blogO;
          break;
        case "GEOPOL":
          Ba = blogG;
          break;
        default:
          Ba = [];
          break;
      }
  
      const filteredCategory = filteredPosts[category] || [];
      
      // Combine and sort data
      const combinedAndSorted = sortAndSlice([...filteredCategory, ...Ba]);
  
      return combinedAndSorted;
    };
  
    return [
      ...mergeAndSort("ANALYSIS"),
      ...mergeAndSort("NEWS"),
      ...mergeAndSort("GEOPOL"), 
      ...mergeAndSort("OPINIONS"),
      ...mergeAndSort("USEFULHACKS"),
      ...mergeAndSort("PROJECTS"),
    ];
  }, [blogA, blogG, blogN, blogO, blogP, blogUFH, filteredPosts]);

  return (
    <>
      <section className="section section4 mx-auto md:px-20 py-16 w-5.5/6">
        <div className="container-section4">
          <div className="item">
            <div className="flex  pb-8 mt-10 mb-20 section1__posts">
              <h1 className="font-bold text-4xl py-8 text-center section1__posts-title">
                Analysis
              </h1>
            </div>
            <div className="section4__posts m-8">
              <div className="flex flex-col gap-1">
                {/* Post */}
                {dataSort4 && dataSort4 ? (
                  <PostColMultiple2 posts={dataSort4} />
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="section3__view">
              <Link href={`/Categories/NEWS`} legacyBehavior>
                <a className="font-bold text-xl py-8 text-center section3__view-title">
                  {" "}
                  View More
                </a>
              </Link>
            </div>
          </div>
          <div className="item">
            <div className="flex  pb-8 mt-10 mb-20 section1__posts">
              <h1 className="font-bold text-4xl py-8 text-center section1__posts-title">
                GeoPol
              </h1>
            </div>
            <div className="section4__posts m-8">
              <div className="flex flex-col gap-1">
                {/* Post */}
                {dataSort5 && dataSort5 ? (
                  <PostColMultiple2 posts={dataSort5} />
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="section3__view">
              <Link href={`/Categories/NEWS`} legacyBehavior>
                <a className="font-bold text-xl py-8 text-center section3__view-title">
                  {" "}
                  View More
                </a>
              </Link>
            </div>
          </div>
          <div className="item">
            <div className="flex  pb-8 mt-10 mb-20 section1__posts">
              <h1 className="font-bold text-4xl py-8 text-center section1__posts-title">
                News
              </h1>
            </div>
            <div className="section4__posts m-8">
              <div className="flex flex-col gap-1">
                {/* Post */}
                {dataSort2 && dataSort2 ? (
                  <PostColMultiple2 posts={dataSort2} />
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="section3__view">
              <Link href={`/Categories/NEWS`} legacyBehavior>
                <a className="font-bold text-xl py-8 text-center section3__view-title">
                  {" "}
                  View More
                </a>
              </Link>
            </div>
          </div>
          <div className="item ">
            <div className="flex pb-8 mt-10 mb-20 section1__posts">
              <h1 className="font-bold text-4xl py-8 text-center section1__posts-title">
                Opinions
              </h1>
            </div>
            <div className="section4__posts m-8">
              <div className="flex flex-col gap-1">
                {/* Post */}
                {dataSort3 && dataSort3 ? (
                  <PostColMultiple2 posts={dataSort3} />
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="section3__view">
              <Link href={`/Categories/PROJECTS`} legacyBehavior>
                <a className="font-bold text-xl py-8 text-center section3__view-title">
                  {" "}
                  View More
                </a>
              </Link>
            </div>
          </div>
          <div className="item ">
            <div className="flex pb-8 mt-10 mb-20 section1__posts">
              <h1 className="font-bold text-4xl py-8 text-center section1__posts-title">
                Projects
              </h1>
            </div>
            <div className="section4__posts m-8">
              <div className="flex flex-col gap-1">
                {/* Post */}
                {dataSort && dataSort ? (
                  <PostColMultiple2 posts={dataSort} />
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="section3__view">
              <Link href={`/Categories/PROJECTS`} legacyBehavior>
                <a className="font-bold text-xl py-8 text-center section3__view-title mb-20">
                  {" "}
                  View More
                </a>
              </Link>
            </div>
          </div>
         <div className="mb-20"></div>

        </div>
      </section>
    </>
  );
}


async function getBlogArticles() {
  try {
    const response = await fetch("/api/getBlogArticles");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const articles = await response.json();
    return articles;
  } catch (error) {
    console.error("Error getting blog articles:", error);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
}

function filterArticlesByCategory(articles, category) {
  return articles.filter((article) => article?.category?.name === category);
}

function sortAndSlice(blogArray) {
  return blogArray.sort((a, b) => b.createdAt - a.createdAt).slice(0, Math.min(blogArray.length, 2));
}