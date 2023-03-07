import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import Link from "next/link";
import Image from "next/image";
import Author from "./_child/Author";
import img1 from "../public/images/code.jpg";
import Spinner from "./_child/Spinner";
import Error from "./_child/Error";

export default function Section3() {
  const { data, isLoading, isError } = fetcher("api/popular");
  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  SwiperCore.use([Autoplay]);

  return (
    <section className="container mx-auto md:px-20 py-16">
      <h1 className="font-bold text-4xl py-12 text-center">Most Popular</h1>
      <Swiper
        slidesPerView={2}
        loop={true}
        autoplay={{
          delay: 4000,
        }}
      >

{data && data.map((post, index) => (<SwiperSlide key={index}>
            <Post post={post} key={post.id}/>
          </SwiperSlide>)
            
          )}
       
      </Swiper>
    </section>
  );
}

function Post({post}) {
  return (
    <div className="grid">
      <div className="images">
        <Link href="/" legacyBehavior>
          <a>
            <Image src={post?.img} alt="" width={450} height={300} />
          </a>
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4">
        <div className="cat flex gap-6">
          <Link href="/" legacyBehavior>
            <a className="text-orange-600 hover:text-orange-800">
            {post?.Category||"UnKnown"}
            </a>
          </Link>
          <Link href="/" legacyBehavior>
            <a className="text-gray-600 hover:text-gray-800">{post?.published||"UnKnown"}</a>
          </Link>
        </div>
        <div className="title">
          <Link href="/" legacyBehavior>
            <a className="text-3xl md:text-4xl font-bold text-gray-800 hover:text-gray-600">
            {post?.title}
            </a>
          </Link>
        </div>
        <p className="text-gray-500 py-3 pr-3">
        {post?.description}
        </p>
        {post?.Author?<Author author={post?.Author}/>:<></>}
      </div>
    </div>
  );
}
