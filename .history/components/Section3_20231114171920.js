import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import { Pagination } from "swiper";
import "swiper/css";
import Link from "next/link";

import { useBlogContext } from "../contexts/BlogContext";

import PostLine from "./PostLine";
import PostLineBA from "./PostLineBA";


import { gsap } from "gsap";
import { useRouter } from "next/router";

export default function Section3() {
  const { blogUFH } = useBlogContext();
  // const {  isLoading, isError } = fetcher("api/popular");
  // if (isLoading) return <Spinner />;
  // if (isError) return <Error />;

  SwiperCore.use([Autoplay]);

  //Router animation
  
  //Sort from newest to oldest

  const [dataSort, setDataSort] = useState([]);
  const [dataSort3, setDataSort3] = useState([]);
 

  useEffect(() => {
    const fetchDataSorted = async () => {
      const blogArt = await getBlogArticles();
      const filteredArticles1 = blogArt.filter((article) => {
        return article?.category?.name === "USEFULHACKS";
      });
      setDataSort3(filteredArticles1);
    };
    fetchDataSorted();
  }, []);

 

  useEffect(() => {
    const dataUFH = [...dataSort3, ...blogUFH];
    const data1 = dataUFH.sort((a, b) => {
      if (b.createdAt > a.createdAt) return 1;
      if (b.createdAt < a.createdAt) return -1;
      return 0;
    });
    setDataSort(data1);
  }, [blogUFH, dataSort3]);

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
                   post?.isPublished? (<SwiperSlide key={index}>
                      
                      <PostLineBA post={post} key={post.id} />
                    </SwiperSlide>):(<SwiperSlide key={index}>

                      <PostLine post={post} key={post.id} />
                    </SwiperSlide>)
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

async function getBlogArticles() {
  const response = await fetch("/api/getBlogArticles");
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const articles = await response.json();
  return articles;
}
