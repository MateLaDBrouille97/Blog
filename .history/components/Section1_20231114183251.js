import React, { useEffect, useState,useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectCoverflow, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { useBlogContext } from "../contexts/BlogContext";
import { useRouter } from "next/router";
import Slide from "./Slide";
import { gsap } from "gsap";

export default function Section1() {
  SwiperCore.use([Autoplay]);
  

  const { blogUFH, blogP, blogN, blogO, blogG, blogA } = useBlogContext();

  const sortAndSlice = (blogArray) =>
    blogArray
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, Math.min(blogArray.length, 2));

  const trending = useMemo(
    () => [
      ...sortAndSlice(blogN),
      ...sortAndSlice(blogA),
      ...sortAndSlice(blogG),
      ...sortAndSlice(blogUFH),
      ...sortAndSlice(blogO),
      ...sortAndSlice(blogP),
    ],
    [blogN, blogA, blogG, blogUFH, blogO, blogP]
  );

  // const { data, isLoading, isError } = fetcher("api/trending");
  // if (isLoading) return <Spinner />;
  // if (isError) return <Error />;

  //Router animation
  
  const bg = {
    background: "url('//marek-piwnicki-WiZOyYqzUss-unsplash.jpg')",
  };
  return (
    <>
      
      <section
        className="section section4 mx-auto md:px-20 py-16 w-5.5/6 background-img"
        id="section1"
      >
        <div className="container-section4">
          <div className="flex justify-center pb-8 mt-10 mb-20 section1__posts">
            <h1 className="font-bold text-4xl text-center section1__posts-title">
              Trending
            </h1>
          </div>
          <div className="swiper__section1">
            <Swiper
              className="postLine__container3"
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
                  slidesPerView: 1,
                },
              }}
              modules={[Pagination]}
            >
              {trending &&
                trending.map((post, index) => (
                  <SwiperSlide key={index}>
                    <Slide post={post} key={post.id} />
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}
