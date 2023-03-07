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

  return (
    <section className="container mx-auto md:px-20 py-16">
      <div className="flex justify-center pb-8 mt-10 mb-20 section1__posts">
        <h1 className="font-bold text-4xl py-8 text-center section1__posts-title">
          Useful Hacks
        </h1>
      </div>

      <Swiper
        autoplay={{
          delay: 6000,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
        }}
        modules={[Pagination]}
      >
        {blogUFH &&
          blogUFH.slice(0, 5).map((post, index) => (
            <SwiperSlide key={index}>
              <PostLine post={post} key={post.id} />
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
  );
}
