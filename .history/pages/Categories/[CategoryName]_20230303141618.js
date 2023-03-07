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
import { gsap } from "gsap";

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
  }, [router.query.CategoryName, router.isReady, data]);

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

  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    let timer;
    const aniStart = async () => {
      timer = setTimeout(() => {
        setIsActive(true);
        const tl = gsap.timeline();
        tl.to(".cover-strip", {
          yPercent: 100,
          duration: 0.8,
          ease: "Expo.easeInOut",
          stagger: 0.1,
        });
      }, 300);
    };
    const aniEnd = () => {
      if (timer) {
        clearTimeout(timer);
      }
      const tl = gsap.timeline();
      if (isActive) {
        tl.to(".cover-strip", {
          yPercent: 200,
          duration: 0.8,
          ease: "Expo.easeInOut",
          stagger: -0.1,
        });
        setIsActive(false);
      }

      tl.set(".cover-strip", { yPercent: 0 });
      clearTimeout(timer);
    };

    router.events.on("routeChangeStart", aniStart);
    router.events.on("routeChangeComplete", aniEnd);
    router.events.on("routeChangeError", aniEnd);

    return () => {
      router.events.off("routeChangeStart", aniStart);
      router.events.off("routeChangeComplete", aniEnd);
      router.events.off("routeChangeError", aniEnd);
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [router]);


  return (
    <Format>
      <div className="flex flex-col overflow-hidden relative z-50">
        <div
          id="cover"
          className="cover-strip h-screen w-3/12 bg-slate-50  top-0 left-0 cover fixed"
        ></div>
        <div
          id="cover1"
          className="cover-strip h-screen w-3/12 bg-slate-100 fixed top-0 left-1/4 cover"
        ></div>
        <div
          id="cover2"
          className="cover-strip h-screen w-3/12 bg-slate-200 fixed top-0 left-2/4 cover"
        ></div>
        <div
          id="cover3"
          className="cover-strip h-screen w-3/12 bg-slate-300 fixed top-0 left-3/4 cover"
        ></div>
      </div>
      <section className="section section__cat mx-auto md:px-2 py-16 w-1/2">
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
          <h1 className="font-bold text-4xl py-8 text-center section1__posts-title">
            Latest Posts
          </h1>
        </div>
        {/* grid columns */}
        {posts ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
            {posts &&
              posts.map((post, index) => (
                <Post3col post={post} key={post.id} />
              ))}
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
