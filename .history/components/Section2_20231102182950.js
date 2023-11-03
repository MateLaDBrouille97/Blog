// import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import Error from "./_child/Error";
import { useBlogContext } from "@/contexts/BlogContext";
// import { useUserContext } from "@/contexts/UserContext";

import Post3col from "@/components/Post3Col";
import { gsap } from "gsap";
import { useRouter } from "next/router";
import prismadb from "@/lib/prismadb";
import getCategories from "@/actions/get-categories";
// import getCategories from "@/actions/get-categories";

export default function Section2(blogArt) {
  const { data } = useBlogContext();

  
  const [dataSort, setDataSort] = useState([]);
  const [dataSort2, setDataSort2] = useState([]);
  // const { isLoading, isError } = fetcher("api/posts");
  // if (isLoading) return <Spinner />;
  // if (isError) return <Error />;

  //Sort from newest to oldest
  const [date, setDate] = useState("");

  console.log(blogArt)
  // const [date2, setDate2] = useState("");

  useEffect(() => {
    const fetchDataSorted = async () => {
      const data1 = await data.sort((a, b) => {
        if (b.createdAt > a.createdAt) return 1;
        if (b.createdAt < a.createdAt) return -1;
        return 0;
      });
      setDataSort(data1);
      const newData = dataSort.filter((item) => item.category !== "TOOLS");
      setDataSort2(newData);

     
    };
    fetchDataSorted();
    
  }, [data,dataSort]);

  

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
      
      <section className="section section4 mx-auto md:px-20 py-16 w-5.5/6 " id="lastestPosts">
        <div className="container-section4">
          <div className="flex justify-center pb-8 mt-10 mb-20 section1__posts">
            <h1 className="font-bold text-4xl py-8 text-center section1__posts-title">
              Latest Posts
            </h1>
          </div>

          {/* grid columns */}
          {data ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 ">
              {dataSort2 &&
                dataSort2
                  .slice(0, 9)
                  .map((post, index) => <Post3col post={post} key={post.id} />)}
            </div>
          ) : (
            <div className="flex flex-col justify-center item-center">
              <Error />
            </div>
          )}
          <div className="section3__view">
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


export async function getStaticProps() {
  try {
    const blogArt = await prismadb.category.findMany({where:{
      billboardId:"014ae746-08c2-4601-859f-7a8f50bc78ce",
    }});
    return {
      props: {
        blogArt,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        blogArt: [],
      },
    };
  }
}
