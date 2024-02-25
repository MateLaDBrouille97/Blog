import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";

import Error2 from "./_child/Error2";
import { useBlogContext } from "../contexts/BlogContext";
import { gsap } from "gsap";
import Post3col from "../components/Post3Col";
import PostsCardBA from "../components/PostsCardBA"
import Post3colBA from "../components/Post3ColBA";
import { useRouter } from "next/router";
import PostsCard from "./PostsCard";

export default function Section2({blogArt}) {
  const { data } = useBlogContext();
 
  const [articlesData2, setArticlesData] = useState([]);
  
 
  useEffect(() => {
    const fetchDataSorted = async () => {
      try {

       
        const dataTotal = [...blogArt, ...data];
        // console.log('Data2',dataTotal)

        const sortedData = dataTotal.sort((a, b) =>
          b.createdAt.localeCompare(a.createdAt)
        );
        const filteredData = sortedData.filter((item) =>
          item.isPublished
            ? item.category.name !== "TOOLS"
            : item.category !== "TOOLS"
        );

        setArticlesData(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state if necessary
      }
    };

    fetchDataSorted();
  }, [blogArt, data]);




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
          {articlesData2 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 ">
              {articlesData2 &&
                articlesData2
                  .slice(0, 9)
                  .map((post, index) =>
                    post.isPublished ? (
                      <PostsCardBA post={post} key={post.id} />
                    ) : (
                      <PostsCard post={post} key={post.id} />
                    )
                  )}
            </div>
          ) : (
            <div className="flex flex-col justify-center item-center">
              <Error2 />
            </div>
          )}
          <div className="section3__view m-10 p-4">
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





