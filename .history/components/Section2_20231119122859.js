import Link from "next/link";
import React, { useEffect, useState,useMemo } from "react";

import Error from "./_child/Error";
import { useBlogContext } from "../contexts/BlogContext";
import { gsap } from "gsap";
import Post3col from "../components/Post3Col";
import Post3colBA from "../components/Post3ColBA";
import { useRouter } from "next/router";

export default function Section2() {
  const { data } = useBlogContext();

  

  const [articlesData, setArticlesData] = useState([]);

  useEffect(() => {
    const fetchDataSorted = async () => {
      try {
        const blogArt = await getBlogArticles();
        const dataTotal = [...blogArt, ...data];
        const sortedData = dataTotal.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        const filteredData = sortedData.filter(
          (item) => (item.isPublished ? item.category.name !== "TOOLS" : item.category !== "TOOLS")
        );
        setArticlesData(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state if necessary
      }
    };

    fetchDataSorted();
  }, [data]);


  //Router animation
  

  return (
    <>
      <section
        className="section section4 mx-auto md:px-20 py-16 w-5.5/6 "
        id="lastestPosts"
      >
        <div className="container-section4">
          <div className="flex justify-center pb-8 mt-10 mb-20 section1__posts">
            <h1 className="font-bold text-4xl py-8 text-center section1__posts-title">
              Latest Posts
            </h1>
          </div>

          {/* grid columns */}
          {articlesData ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 ">
              {articlesData &&
                articlesData
                  .slice(0, 9)
                  .map((post, index) =>
                    post.isPublished ? (
                      <Post3colBA postBA={post} key={post.id} />
                    ) : (
                      <Post3col post={post} key={post.id} />
                    )
                   
                  )}
            </div>
          ) : (
            <div className="flex flex-col justify-center item-center">
              <Error />
            </div>
          )}
          <div className="section3__view">
            <Link href={`/Categories/POSTS`} legacyBehavior>
              <a className="font-bold text-xl py-8 text-center section3__view-title">
                {" "}
                View More
              </a>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

async function getBlogArticles() {
  const response = await fetch("https://main.d6iszn1o7sirg.amplifyapp.com/api/getBlogArticles",{ next: { revalidate: 10 } });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const articles = await response.json();
  return articles;
}
