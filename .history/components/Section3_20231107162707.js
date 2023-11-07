import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import { Pagination } from "swiper";
import "swiper/css";
import Link from "next/link";

import { useBlogContext } from "../contexts/BlogContext";

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
      
      <section className="section section4 mx-auto md:px-20 py-16 w-5.5/6 background-img2">
        <div className="container-section4">
          <div className="flex justify-center pb-8 mt-10 mb-20 section3__posts">
            <h1 className="font-bold text-4xl py-8 text-center section3__posts-title">
              Useful Hacks
            </h1>
          </div>
          <div className="section3__container">
            <div className=" swiper-containergrid md:grid-cols-1 lg:grid-cols-2 gap-14">
              <Swiper
                className="postLine__container"
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
                    <SwiperSlide key={index}>
                      <PostLine post={post} key={post.id} />
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
            <div className="section3__view">
              <Link href={`/Categories/USEFULHACKS`} legacyBehavior>
                <a className="font-bold text-xl py-8 text-center section3__view-title">
                  {" "}
                  View More
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
