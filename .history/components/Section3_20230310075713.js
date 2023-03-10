import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import { Pagination } from "swiper";
import "swiper/css";
import Link from "next/link";
import Image from "next/image";
import Author from "./_child/Author";
import img1 from "../public/images/code.jpg";
import Spinner from "./_child/Spinner";
import Error from "./_child/Error";
import fetcher from "@/lib/fetcher";
import { useBlogContext } from "@/contexts/BlogContext";
import { useUserContext } from "@/contexts/UserContext";
import { DataStore } from "aws-amplify";
import { User } from "@/src/models";
import PostLine from "./PostLine";
import { gsap } from "gsap";
import { useRouter } from "next/router";

export default function Section3() {
  const { blogUFH } = useBlogContext();
  // const {  isLoading, isError } = fetcher("api/popular");
  // if (isLoading) return <Spinner />;
  // if (isError) return <Error />;

  SwiperCore.use([Autoplay]);

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

  //Sort from newest to oldest

  const [dataSort, setDataSort] = useState([]);

  useEffect(() => {
    const data1 = blogUFH.sort((a, b) => {
      if (b.createdAt > a.createdAt) return 1;
      if (b.createdAt < a.createdAt) return -1;

      return 0;
    });
    setDataSort(data1);
  }, [blogUFH]);

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
      <section className="container mx-auto md:px-20 py-16">
        <div className="flex justify-center pb-8 mt-10 mb-20 section1__posts">
          <h1 className="font-bold text-4xl py-8 text-center section1__posts-title">
            Useful Hacks
          </h1>
        </div>

        <Swiper
        className="postLine__container "
        spaceBetween={10}
          autoplay={{
            delay: 6000,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            576: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,

            },
          }}
          modules={[Pagination]}
        >
          {dataSort &&
            dataSort.slice(0, 6).map((post, index) => (
              <SwiperSlide  key={index}>
                <PostLine  post={post} key={post.id} />
              </SwiperSlide>
            ))}
        </Swiper>
        
        <div className="section3__view">
          <Link href={`/Categories/USEFULHACKS`} legacyBehavior>
            <a className="font-bold text-xl py-8 text-center section3__view-title">
              {" "}
              View More
            </a>
          </Link>
        </div>
      </section>
    </>
  );
}
