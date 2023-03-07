import Author from "@/components/_child/Author";
import Related from "@/components/_child/Related";
import Format from "@/layout/Format";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import blogData from "../api/blogDataName";
import { useRouter } from "next/router";
import { useBlogContext } from "@/contexts/BlogContext";
import Link from "next/link";
import Error from "@/components/_child/Error";
import { useUserContext } from "@/contexts/UserContext";
import { DataStore } from "aws-amplify";
import { User } from "@/src/models";
import Post3col from "@/components/Post3Col";

export default function CategoryName() {
  const router = useRouter();
  const categoryName = router?.query?.CategoryName;
  const { categoriesName } = blogData;
  const { blogUFH, blogP, blogN, data } = useBlogContext();
  const [cat, setCat] = useState("");
  const [posts, setPosts] = useState([]);
  

  useEffect(() => {
    const postsD = () => {
      if (!router.isReady) return;
      const filt = categoriesName?.filter(
        (value) => value?.name == categoryName
      );
      setCat(filt?.[0]);
      switch (categoryName) {
        case "USEFULHACKS":
          setPosts(blogUFH);
          break;
        case "PROJECTS":
          setPosts(blogP);
          break;
        case "NEWS":
          setPosts(blogN);
          break;
      }
    };
    postsD();
  }, [router.query.CategoryName, router.isReady,data]);

  return (
    <>
    <div
      id={
        router?.query?.CategoryName == "USEFULHACKS"
          ? "usefulHacks"
          : router?.query?.CategoryName == "PROJECTS"
          ? "projects"
          : "news"
      }
    >
      {cat && <Category category={cat} posts={posts} key={cat?.id} />}
    </div>
    </>
    
  );
}

function Category({ category, posts }) {
  return (
    <Format>
      <section className="section section__cat mx-auto md:px-2 py-16 w-1/2" >
        <div className="container post py-10 flex flex-row justify-begin ">
          <div className="image pr-10 flex justify-center ">
            <Image
              src={category?.image}
              alt=""
              width={120}
              height={80}
              className="category__img"
            />
          </div>
          <h1 className=" font-bold flex flex-col justify-center text-4xl text-center pb-5 ">
            {category?.name}
          </h1>
        </div>
        <div className="flex justify-center pb-8 mt-10 mb-20 section1__posts">
        <h1 className="font-bold text-4xl py-8 text-center section1__posts-title">Latest Posts</h1>
      </div>
        {/* grid columns */}
        {posts ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
            {posts &&
              posts.map((post, index) => <Post3col post={post} key={post.id} />)}
          </div>
        ) : (
          <div className="flex flex-col justify-center item-center">
            {" "}
            <Error />
          </div>
        )}
      </section>
    </Format>
  );
}


