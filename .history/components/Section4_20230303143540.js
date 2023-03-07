import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import img1 from "../public/images/code.jpg";
import Author from "./_child/Author";
import Error from "./_child/Error";
import Spinner from "./_child/Spinner";
import fetcher from "@/lib/fetcher";
import { useBlogContext } from "@/contexts/BlogContext";
import { useUserContext } from "@/contexts/UserContext";
import { User } from "@/src/models";
import { DataStore } from "aws-amplify";
import PostCol from "./PostCol";
import { gsap } from "gsap";
import { useRouter } from "next/router";

export default function Section4() {
  const { blogUFH, blogP, blogN, data } = useBlogContext();

  // const { isLoading, isError } = fetcher("api/posts");
  // if (isLoading) return <Spinner />;
  // if (isError) return <Error />;

  // const dataC =data?.filter((post)=>post.Category=="Code");

  // const dataP =data?.filter((post)=>post.Category=="Project");

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
      <section className="section section4 mx-auto md:px-20 py-16">
        <div className="container">
          <div className="grid lg:grid-cols-2 ">
            <div className="item container">
              <div className="flex pb-8 mt-10 mb-20 section1__posts">
                <h1 className="font-bold text-4xl py-8 text-center section1__posts-title">
                  Projects
                </h1>
              </div>
              <div className="section4__posts">
                <div className="flex flex-col gap-6">
                  {/* Post */}
                  {blogP ? (
                    blogP
                      .slice(0, 5)
                      .map((post, index) => (
                        <PostCol post={post} key={post.id} />
                      ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="section3__view">
                <Link href={`/Categories/PROJECTS`} legacyBehavior>
                  <a className="font-bold text-xl py-8 text-center section3__view-title">
                    {" "}
                    View More
                  </a>
                </Link>
              </div>
            </div>
            <div className="item">
              <div className="flex  pb-8 mt-10 mb-20 section1__posts">
                <h1 className="font-bold text-4xl py-8 text-center section1__posts-title">
                  IT News
                </h1>
              </div>
              <div className="section4__posts">
                <div className="flex flex-col gap-6">
                  {/* Post */}
                  {blogN ? (
                    blogN
                      .slice(0, 5)
                      .map((post, index) => (
                        <PostCol post={post} key={post.id} />
                      ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="section3__view">
                <Link href={`/Categories/NEWS`} legacyBehavior>
                  <a className="font-bold text-xl py-8 text-center section3__view-title">
                    {" "}
                    View More
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
