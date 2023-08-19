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

export default function Section1() {
  SwiperCore.use([Autoplay]);

  const { blogUFH, blogP, blogN, blogO, blogG, blogA } = useBlogContext();

  const b1 = blogUFH.sort((a, b) => {
    if (b.createdAt > a.createdAt) return 1;
    if (b.createdAt < a.createdAt) return -1;
    return 0;
  });

  const b2 = blogP.sort((a, b) => {
    if (b.createdAt > a.createdAt) return 1;
    if (b.createdAt < a.createdAt) return -1;
    return 0;
  });

  const b3 = blogN.sort((a, b) => {
    if (b.createdAt > a.createdAt) return 1;
    if (b.createdAt < a.createdAt) return -1;
    return 0;
  });

  const b4 = blogO.sort((a, b) => {
    if (b.createdAt > a.createdAt) return 1;
    if (b.createdAt < a.createdAt) return -1;
    return 0;
  });

  const b5 = blogA.sort((a, b) => {
    if (b.createdAt > a.createdAt) return 1;
    if (b.createdAt < a.createdAt) return -1;
    return 0;
  });

  const b6 = blogG.sort((a, b) => {
    if (b.createdAt > a.createdAt) return 1;
    if (b.createdAt < a.createdAt) return -1;
    return 0;
  });

  const blogList1 = blogUFH.length > 1 ? b1.slice(0, 2) : b1.slice(0, 1);
  const blogList2 = blogP.length > 1 ? b2.slice(0, 2) : b2.slice(0, 1);
  const blogList3 = blogN.length > 1 ? b3.slice(0, 2) : b3.slice(0, 1);
  const blogList4 = blogO.length > 1 ? b4.slice(0, 2) : b3.slice(0, 1);
  const blogList5 = blogA.length > 1 ? b5.slice(0, 2) : b5.slice(0, 1);
  const blogList6 = blogG.length > 1 ? b6.slice(0, 2) : b6.slice(0, 1);
  const trending = [
    ...blogList3,
    ...blogList5,
    ...blogList6,
    ...blogList1,
    ...blogList4,
    ...blogList2,
  ];

  // const { data, isLoading, isError } = fetcher("api/trending");
  // if (isLoading) return <Spinner />;
  // if (isError) return <Error />;

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

  const bg = {
    background: "url('//marek-piwnicki-WiZOyYqzUss-unsplash.jpg')",
  };
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
      <section
        className="section py-16 trending__container background-img"
        id="section1"
      >
        <div className="container mt-5 mx-auto md:px-20 content content-v2">
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
      </section>
    </>
  );
}
