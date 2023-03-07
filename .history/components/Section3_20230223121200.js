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

export default function Section3() {
  const {blogUFH,   
    }=useBlogContext();
  // const {  isLoading, isError } = fetcher("api/popular");
  // if (isLoading) return <Spinner />;
  // if (isError) return <Error />;

  SwiperCore.use([Autoplay]);

  return (
    <section className="container mx-auto md:px-20 py-16">
      <h1 className="font-bold text-4xl py-12 text-center">Useful Hacks</h1>
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
          ))
          }
      </Swiper>
    </section>
  );
}

