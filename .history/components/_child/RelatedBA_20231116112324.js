import React, { useEffect, useState } from "react";
import { useBlogContext } from "../../contexts/BlogContext";
import Link from "next/link";
import PostColBA from "../PostColBA";
import PostCol from "../PostCol";

export default function RelatedBA({ post }) {
  const { data } = useBlogContext();
  const [related, setRelated] = useState([]);
  const [dataSort3, setDataSort3] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getBlogArticles");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const articles = await response.json();
        setDataSort3(articles);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error if needed
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterAndSortRelated = () => {
      const dataRelated = related3?.filter(
        (value) =>
          post?.isPublished ? value.category === post?.category?.name : value.category === post?.category
      );

      const dataRelatedSorted = dataRelated.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      setRelated(dataRelatedSorted);
    };

    filterAndSortRelated();
  }, [post, related3]);

  const related3 = [...dataSort3, ...data];

  return (
    <section className="section section4 mx-auto md:px-20 py-16 w-5.5/6">
      <div className="container-section4">
        <div className="flex pb-8 mt-10 mb-20 section1__posts">
          <Link href={`/Categories/${post?.category?.name}`} legacyBehavior>
            <a className="related__title">
              <h1 className="font-bold text-4xl py-8 text-begin section1__posts-title">Related</h1>
            </a>
          </Link>
        </div>

        <div className="flex flex-col gap-0.25 related__post">
          {related &&
            related.slice(0, 5).map((post, index) =>
              post?.isPublished ? <PostColBA postBA={post} key={post.id} /> : <PostCol post={post} key={post.id} />
            )}
        </div>
      </div>
    </section>
  );
}
