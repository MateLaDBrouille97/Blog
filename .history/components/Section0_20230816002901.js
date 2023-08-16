import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectCoverflow, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { useBlogContext } from "@/contexts/BlogContext";
import { useRouter } from "next/router";
import Slide from "./Slide";
import { gsap } from "gsap";

export default function Section0() {

    const bg = {
        background: "url('/Squiggles - Colorful (1).png')",
     
      };
  
  return (
    <section className="section py-16 trending__container" >
         <div className="main-section-zero">
         <div className="post__article-blog2" style={bg} />
            <div className="left"></div>
            <div className="right"></div>
         </div>
    </section>
      
        
      
  
  );
}

