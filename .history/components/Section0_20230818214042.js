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

function Section0() {
  return (
  <>
   <div className="flex flex-col overflow-hidden relative z-50 ">
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
    <section className="section py-16 trending__container  ">
    
        <div className="main-section">
        <div className="main-section-zero">
          <div className="left">
            <div className="lnav">
              <i class="ri-copyright-line"></i>
              <div className="lnavr">
                <a href="#lastestPosts">Home</a>
                {/* <i class="ri-instagram-line"></i> */}
                <a  href="https://www.linkedin.com/in/manuel-thomas-labridy-70220a3a"><i class="ri-linkedin-box-fill"></i></a>
                
              </div>
            </div>
            <div className="textcenter">
              <h1>Welcome to OTOMATA,</h1>
              <p>
              Otomata serves as a blog focused on the intricate relationship between Technology and its profound impact on our society, on sciences, present and future energy needs, and environmental concerns like climate change. The blog strives to depict a sketch of the evolving connections among nations during the AI revolution era.
              </p>
              <a href="#section1">Read</a>
            </div>
          </div>
          <div className="right">
            <div className="rtop">
              <div className="rtopleft"></div>
              <div className="rtopright"></div>
            </div>
            <div className="rbottom"></div>
          </div>
        </div>
      </div>
    
      
    </section>
  </>
   
  );
}

export default Section0;
