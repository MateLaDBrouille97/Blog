import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

import { useBlogContext } from "../contexts/BlogContext";

import PostLine from "./PostLine";
import PostLineBA from "./PostLineBA";

import PostsCardBA from "./PostsCardBA";
import PostsCard from "./PostsCard";

import { gsap } from "gsap";
import { useRouter } from "next/router";

export default function Section3({ blogArt }) {
  const { blogUFH } = useBlogContext();
  // const {  isLoading, isError } = fetcher("api/popular");
  // if (isLoading) return <Spinner />;
  // if (isError) return <Error />;

  SwiperCore.use([Autoplay, Pagination]);

  //Router animation

  //Sort from newest to oldest

  const [dataSort, setDataSort] = useState([]);

  useEffect(() => {
    const fetchDataSorted = async () => {
      const filteredArticles1 = blogArt.filter((article) => {
        return article?.category?.name === "USEFULHACKS";
      });
      const dataUFH = [...filteredArticles1, ...blogUFH];
      const sortedData = dataUFH.sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt)
      );
      setDataSort(sortedData);
    };
    fetchDataSorted();
  }, [blogUFH, blogArt]);

  return (
    <>
      <section className="section section4 mx-auto md:px-20 py-16 w-5.5/6 background-img2">
        <div className="container-section4 flex justify-center items-center">
          <div className="flex justify-center pb-8 mt-10 mb-20 section3__posts">
            <h1 className="font-bold text-4xl py-8 text-center section3__posts-title">
              Useful Hacks
            </h1>
          </div>
          <div className="section3__container2 ">
            <div className="swiper-container grid md:grid-cols-1 lg:grid-cols-2 gap-14 ">
              <Swiper
                className="post_sect3"
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
                  dataSort
                    .slice(0, 6)
                    .map((post, index) => (
                      <SwiperSlide key={index} >
                        {post.isPublished ? (
                          <PostsCardBA post={post} index={index} />
                        ) : (
                          <PostsCard post={post} index={index} />
                        )}
                      </SwiperSlide>
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
