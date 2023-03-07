
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { useBlogContext } from "@/contexts/BlogContext";

import Slide from "./Slide";

export default function Section1() {
  SwiperCore.use([Autoplay]);

  const{blogUFH,
    blogP,
    blogN,
    }=useBlogContext();

    const blogList1=blogUFH.length>1?blogUFH.slice(0, 2):blogUFH.slice(0, 1);
    const blogList2=blogP.length>1?blogP.slice(0, 2):blogP.slice(0, 1)
    const blogList3=blogN.length>1?blogN.slice(0, 2):blogN.slice(0, 1)
    const trending=[...blogList1,...blogList2,...blogList3];

  // const { data, isLoading, isError } = fetcher("api/trending");
  // if (isLoading) return <Spinner />;
  // if (isError) return <Error />;

  const bg = {
    background: "url('/images/Miroodles.png')no-repeat",
    backgroundPosition: "right",
  };
  return (
    <section className="py-16 trending__section" style={bg} >
      <div className="container mx-auto md:px-20 trending__container">
        <h1 className="font-bold text-4xl pb-12 text-center">Trending</h1>

        <Swiper
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 4000,
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
          {trending && trending.map((post, index) => (<SwiperSlide key={index}>
            <Slide post={post} key={post.id}/>
          </SwiperSlide>)
            
          )}
           
        </Swiper>
      </div>
    </section>
  );
}

