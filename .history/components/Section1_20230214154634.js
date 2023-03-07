import Image from "next/image";
import Link from "next/link";
import React from "react";
import img1 from "../public/images/code.jpg";
import Author from "./_child/Author";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import Spinner from "./_child/Spinner";
import Error from "./_child/Error";
import fetcher from "@/lib/fetcher";

export default function Section1() {
  SwiperCore.use([Autoplay]);

  const { data, isLoading, isError } = fetcher("api/posts");
  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  const bg = {
    background: "url('/images/Miroodles.png')no-repeat",
    backgroundPosition: "right",
  };
  return (
    <section className="py-16" style={bg}>
      <div className="container mx-auto md:px-20">
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
          {data && data.map((post, index) => {<SwiperSlide>
            <Slide post={post} key={post.id}/>
          </SwiperSlide>}
            
          )}
          
          <SwiperSlide>{Slide()}</SwiperSlide>
          <SwiperSlide>{Slide()}</SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}

function Slide({post}) {
  return (
    <div className="grid md:grid-cols-2">
      <div className="image">
        <Link href="/" legacyBehavior>
          <a>
            <Image src={post?.image} alt="" width={600} height={600} />
          </a>
        </Link>
      </div>
      <div className="info">
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
            <a className="text-3xl md:text-6xl font-bold text-gray-800 hover:text-gray-600">
            {post?.title}
            </a>
          </Link>
        </div>
        <p className="text-gray-500 py-3 mr-20">
        {post?.description}
        </p>
        {post?.Author?<Author author={post?.Author}/>:<></>}
      </div>
    </div>
  );
}
