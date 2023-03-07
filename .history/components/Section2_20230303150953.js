import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Author from "./_child/Author";
import img1 from "../public/images/code.jpg";
import getPost from "@/lib/helper";
import fetcher from "@/lib/fetcher";
import Spinner from "./_child/Spinner";
import Error from "./_child/Error";
import { useBlogContext } from "@/contexts/BlogContext";
import { useUserContext } from "@/contexts/UserContext";
import { User } from "@/src/models";
import { DataStore } from "aws-amplify";
import Post3col from "@/components/Post3Col";
import { gsap } from "gsap";
import { useRouter } from "next/router";

export default function Section2() {
  const { data } = useBlogContext();
  // const { isLoading, isError } = fetcher("api/posts");
  // if (isLoading) return <Spinner />;
  // if (isError) return <Error />;
  const dataSort= data.sort((a, b) => {
    if (a.createdAt > b.createdAt) return 1
    if (a.createdAt < b.createdAt) return -1

    return 0
  })
  
  //Router animation
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
<>
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
<section className="section mx-auto md:px-20 py-20">
      <div className="container">
      <div className="flex justify-center pb-8 mt-10 mb-20 section1__posts">
        <h1 className="font-bold text-4xl py-8 text-center section1__posts-title">Latest Posts</h1>
      </div>
      
      {/* grid columns */}
      {data ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
          {dataSort &&
            dataSort.slice(0, 9).map((post, index) => <Post3col post={post} key={post.id} />)
            }
        </div>
      ) : (
        <div className="flex flex-col justify-center item-center">
          <Error />
        </div>
      )}
      </div>
    </section>
</>

    
  );
}
