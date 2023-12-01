import React, { useEffect, useState } from "react";
import { useBlogContext } from "../../contexts/BlogContext";
import Link from "next/link";
import PostColBA from "../PostColBA";
import PostCol from "../PostCol";

async function getBlogArticles() {
  const response = await fetch("/api/getBlogArticles");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}

export default function RelatedBA({ post }) {
  const { data } = useBlogContext();
  const [dataSort3, setDataSort3] = useState([]);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchDataSorted = async () => {
      try {
        const blogArt = await getBlogArticles();
        setDataSort3(blogArt);
      } catch (error) {
        console.error("Error fetching blog articles:", error.message);
      }
    };

    fetchDataSorted();
  }, []);

  useEffect(() => {
    const dataRelated = dataSort3?.concat(data || []).filter(
      (value) => (post?.isPublished ? value.category === post?.category?.name : value.category === post?.category)
    );

    const dataRelated2 = dataRelated.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    setRelated(dataRelated2);
  }, [data, dataSort3, post]);

  return (
    <section className="section section4 mx-auto md:px-20 py-16 w-5.5/6">
      <div className="container-section4">
        <div className="flex pb-8 mt-10 mb-20 section1__posts">
          <Link href={post?.isPublished?`/Categories/${post?.category?.name}`:`/Categories/${post?.category}`} legacyBehavior>
            <a className="related__title">
              <h1 className="font-bold text-4xl py-8 text-begin section1__posts-title">Related</h1>
            </a>
          </Link>
        </div>

        <div className="flex flex-col gap-0.25 related__post">
          {related.slice(0, 5).map((postItem) => (
            postItem?.isPublished ? <PostColBA postBA={postItem} key={postItem.id} /> : <PostCol post={postItem} key={postItem.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

