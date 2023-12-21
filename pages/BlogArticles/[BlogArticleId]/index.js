"use client";

import Format from "../../../layout/Format";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BlogArticle from "./_components/blogArticle-layout";
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
  const articles = await response2.json();

  return { props: { blogArt, articles } };
}

function BlogArticleLayout({ blogArt, articles }) {
  //   const { userId } = auth();

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  return (
    <>
      <Format>
        <BlogArticle articles={articles} blogArt={blogArt} />
      </Format>
    </>
  );
}

export default BlogArticleLayout;
