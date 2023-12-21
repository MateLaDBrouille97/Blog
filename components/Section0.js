import React, { useEffect, useState, useRef } from "react";
import "remixicon/fonts/remixicon.css";
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
import Image from "next/image";

function Section0() {
  const text = "Welcome to OTOMATA,";
  const text2 =
    "Otomata serves as a blog focused on the intricate relationship between Technology and its profound impact on our society, on sciences, present and future energy needs, and environmental concerns like climate change. The blog strives to depict a sketch of the evolving connections among nations during the AI revolution era.";

  const textRef = useRef(null);
  const text2Ref = useRef(null);
  const linkedIn = useRef(null);

  useEffect(() => {
    // Animation for text
    gsap.fromTo(
      textRef.current,
      { x: "-100%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 1, ease: "power2.inOut" }
    );

    // Animation for text2
    gsap.fromTo(
      text2Ref.current,
      { x: "-100%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 1, ease: "power2.inOut", delay: 0.5 }
    );

    gsap.fromTo(
      linkedIn.current,
      { x: "-100%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 1, ease: "power2.inOut", delay: 0.5 }
    );
  }, []);

  //Animation for Image

  const rbottomRef = useRef(null);
  const rtopleftRef = useRef(null);
  const rtoprightRef = useRef(null);



 

  return (
    <>
      <section
        
        className="section section0 mx-auto md:px-20 py-16 w-5.5/6 "
      >
        <div className="main-section container-section0">
          <div className="main-section-zero ">
            <div className="left">
              <div className="lnav">
                <i ref={linkedIn} className="ri-copyright-line"></i>
                <div className="lnavr">
                  <a ref={linkedIn} href="#lastestPosts">
                    Home
                  </a>
                  {/* <i class="ri-instagram-line"></i> */}
                  <a href="https://www.linkedin.com/in/manuel-thomas-labridy-70220a3a">
                    <i ref={linkedIn} className="ri-linkedin-box-fill"></i>
                  </a>
                </div>
              </div>
              <div className="textcenter">
                <h1 ref={textRef}>{text}</h1>
                <p ref={text2Ref}>{text2}</p>
                <a ref={linkedIn} href="#section1">Read</a>
              </div>
            </div>
            <div className="right">
              <div className="rtop">
                <div ref={rtopleftRef} className="rtopleft">
                  
                </div>
                <div ref={rtoprightRef} className="rtopright"></div>
              </div>
              <div ref={rbottomRef} className="rbottom">
              
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Section0;
