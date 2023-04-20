import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { useBlogContext } from "@/contexts/BlogContext";
import { useRouter } from "next/router";
import Slide from "./Slide";
import { gsap } from "gsap";

export default function Section1() {
  SwiperCore.use([Autoplay]);

  const{blogUFH,
    blogP,
    blogN,
    blogO,
    }=useBlogContext();

    const b1=blogUFH.sort((a, b) => { 
      if (b.createdAt > a.createdAt) return 1
      if (b.createdAt< a.createdAt) return -1
      return 0
    });

    const b2=blogP.sort((a, b) => { 
      if (b.createdAt > a.createdAt) return 1
      if (b.createdAt< a.createdAt) return -1
      return 0
    });

    const b3=blogN.sort((a, b) => { 
      if (b.createdAt > a.createdAt) return 1
      if (b.createdAt< a.createdAt) return -1
      return 0
    });

    const b4=blogO.sort((a, b) => { 
      if (b.createdAt > a.createdAt) return 1
      if (b.createdAt< a.createdAt) return -1
      return 0
    });


    const blogList1=blogUFH.length>1?b1.slice(0, 2):b1.slice(0, 1);
    const blogList2=blogP.length>1?b2.slice(0, 2):b2.slice(0, 1)
    const blogList3=blogN.length>1?b3.slice(0, 2):b3.slice(0, 1)
    const blogList4=blogO.length>1?b4.slice(0, 2):b3.slice(0, 1)
    const trending=[...blogList1,...blogList2,...blogList3,...blogList4];

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
    background: "url('/images/Squiggles - Colorful (5).png')no-repeat",
    backgroundPosition: "left bottom",
  };
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
    <section className="section py-16 trending__container" style={bg} >
      <div className="container mt-36 mx-auto md:px-20 ">
        <div className="flex justify-center pb-8 mt-10 mb-20 section1__posts">
          <h1 className="font-bold text-4xl text-center section1__posts-title">Trending</h1>
        </div>
        
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
          {trending && trending.map((post, index) => (
          <SwiperSlide key={index}>
            <Slide post={post} key={post.id}/>
          </SwiperSlide>
          )
            
          )}
           
        </Swiper>
      </div>
    </section>
    </>
    
  );
}

