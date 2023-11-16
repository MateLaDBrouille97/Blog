import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";
import { useBlogContext } from "../contexts/BlogContext";
import { getBlogArticles } from "./api/getBlogArticles"; // Import the function directly
import PostColMultiple2 from "./PostColMultiple2";

export default function Section4() {
  const { blogP, blogN, blogO, blogA, blogG, blogUFH } = useBlogContext();
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchDataSorted = async () => {
      try {
        const blogArt = await getBlogArticles();
        const combinedPosts = {
          ANALYSIS: filterAndSort(blogA, blogArt, "ANALYSIS"),
          NEWS: filterAndSort(blogN, blogArt, "NEWS"),
          GEOPOL: filterAndSort(blogG, blogArt, "GEOPOL"),
          OPINIONS: filterAndSort(blogO, blogArt, "OPINIONS"),
          PROJECTS: filterAndSort(blogP, blogArt, "PROJECTS"),
          USEFULHACKS: [], // Exclude USEFULHACKS
        };

        setFilteredPosts(combinedPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state if necessary
      }
    };

    fetchDataSorted();
  }, [blogA, blogG, blogN, blogO, blogP, blogUFH]);

  const filterAndSort = (categoryData, allData, category) => {
    const filteredCategory = filterArticlesByCategory(allData, category);
    return sortAndSlice([...filteredCategory, ...categoryData]);
  };

  const sortAndSlice = (blogArray) => {
    return blogArray
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, Math.min(blogArray.length, 2));
  };

  const renderPosts = (category, data) => (
    <div className="item">
      <div className="flex pb-8 mt-10 mb-20 section1__posts">
        <h1 className="font-bold text-4xl py-8 text-center section1__posts-title">
          {category}
        </h1>
      </div>
      <div className="section4__posts m-8">
        <div className="flex flex-col gap-1">
          {data.length ? <PostColMultiple2 posts={data} /> : <></>}
        </div>
      </div>
      <div className="section3__view">
        <Link href={`/Categories/${category}`} legacyBehavior>
          <a className="font-bold text-xl py-8 text-center section3__view-title">
            {" "}
            View More
          </a>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <section className="section section4 mx-auto md:px-20 py-16 w-5.5/6">
        <div className="container-section4">
          {Object.entries(filteredPosts).map(([category, data]) =>
            renderPosts(category, data)
          )}
          <div className="mb-20"></div>
        </div>
      </section>
    </>
  );
}
