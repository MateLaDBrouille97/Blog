import Link from "next/link";
import React, { useEffect, useState, useMemo } from "react";
import { useBlogContext } from "../contexts/BlogContext";
import { gsap } from "gsap";
import { useRouter } from "next/router";
import PostColMultiple2 from "./PostColMultiple2";

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
    throw error;
  }
}

function filterArticlesByCategory(articles, category) {
  return articles.filter((article) => article?.category?.name === category);
}

function sortAndSlice(blogArray) {
  return blogArray
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, Math.min(blogArray.length, 10));
}

export default function Section4() {
  const { blogP, blogN, blogO, blogA, blogG, blogUFH } = useBlogContext();

  const [blogArticles, setBlogArticles] = useState([]);

  useEffect(() => {
    const fetchDataSorted = async () => {
      try {
        const blogArt = await getBlogArticles();
        setBlogArticles(blogArt);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataSorted();
  }, []);

  const filteredPosts = useMemo(() => {
    const combinedPosts = {
      ANALYSIS: filterArticlesByCategory(blogArticles, "ANALYSIS"),
      NEWS: filterArticlesByCategory(blogArticles, "NEWS"),
      GEOPOL: filterArticlesByCategory(blogArticles, "GEOPOL"),
      OPINIONS: filterArticlesByCategory(blogArticles, "OPINIONS"),
      PROJECTS: filterArticlesByCategory(blogArticles, "PROJECTS"),
    };

    return combinedPosts;
  }, [blogArticles]);

  const mergeAndSort = (category) => {
    let Ba;
    switch (category) {
      case "ANALYSIS":
        Ba = blogA;
        break;
      case "NEWS":
        Ba = blogN;
        break;
      case "GEOPOL":
        Ba = blogG;
        break;
      case "OPINIONS":
        Ba = blogO;
        break;
      case "PROJECTS":
        Ba = blogP;
        break;
      default:
        Ba = [];
        break;
    }

    const filteredCategory = filteredPosts[category] || [];
    const combinedAndSorted = sortAndSlice([...filteredCategory, ...Ba]);

    return combinedAndSorted;
  };

  const categories = [
    { title: "Analysis", category: "ANALYSIS" },
    { title: "GeoPol", category: "GEOPOL" },
    { title: "News", category: "NEWS" },
    { title: "Opinions", category: "OPINIONS" },
    { title: "Projects", category: "PROJECTS" },
  ];

  return (
    <>
      <section className="section section4 mx-auto md:px-20 py-16 w-5.5/6">
        <div className="container-section4">
          {categories.map((category) => (
            <div className="item" key={category.category}>
              <div className="flex pb-8 mt-10 mb-20 section1__posts">
                <h1 className="font-bold text-4xl py-8 text-center section1__posts-title">
                  {category.title}
                </h1>
              </div>
              <div className="section4__posts m-8">
                <div className="flex flex-col gap-1">
                  {mergeAndSort(category.category).length > 0 ? (
                    <PostColMultiple2 posts={mergeAndSort(category.category)} />
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="section3__view">
                <Link href={`/Categories/${category.category}`} legacyBehavior>
                  <a className="font-bold text-xl py-8 text-center section3__view-title">
                    View More
                  </a>
                </Link>
              </div>
            </div>
          ))}
          <div className="mb-20"></div>
        </div>
      </section>
    </>
  );
}
