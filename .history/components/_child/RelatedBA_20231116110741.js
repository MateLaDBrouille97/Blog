import React, { useEffect, useState } from "react";
import { useBlogContext } from "../../contexts/BlogContext";

import Link from "next/link";
import PostColBA from "../PostColBA";
import PostCol from "../PostCol";

export default function RelatedBA({ post }) {

  const [related, setRelated] = useState([]);
  const { data } = useBlogContext();
  const [dataSort3, setDataSort3] = useState([]);
  
  // const { data, isLoading, isError } = fetcher("api/posts");
  useEffect(() => {
    const dataRelated = related3?.filter(
      (value) => (post?.isPublished? value.category == post?.category?.name:value.category==post?.category)
    );
    const dataRelated2 = dataRelated.sort((a, b) => {
      if (b.createdAt > a.createdAt) return 1;
      if (b.createdAt < a.createdAt) return -1;
      return 0;
    });
    setRelated(dataRelated2);
  }, []);

  // if (isLoading) return <Spinner />;
  // if (isError) return <Error />;

  useEffect(() => {
    const fetchDataSorted = async () => {
      const blogArt = await getBlogArticles();
      console.log(blogArt)
      
      setDataSort3(blogArt);
    };
    fetchDataSorted();
  }, []);

  const related2=[...dataSort3 , ...related]
  const related3=[...dataSort3 , ...data]

  return (
    <section className="section section4 mx-auto md:px-20 py-16 w-5.5/6">
      <div className="container-section4">
        <div className="flex pb-8 mt-10 mb-20 section1__posts">
          <Link href={`/Categories/${post?.category?.name}`} legacyBehavior>
            <a className="related__title">
              <h1 className="font-bold text-4xl py-8 text-begin section1__posts-title">
                Related
              </h1>
            </a>
          </Link>
        </div>

        <div className="flex flex-col gap-0.25 related__post">
          {related &&
            related
              .slice(0, 5)
              .map((post, index) =>
               (post?.isPublished ? (
                  <PostColBA postBA={post} key={post.id} />
                ) : (
                  <PostCol post={post} key={post.id} />
                ))
              )}
        </div>
      </div>
    </section>
  );
}


async function getBlogArticles() {
  const response = await fetch("/api/getBlogArticles");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const articles = await response.json();
  return articles;
}
