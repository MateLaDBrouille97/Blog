import Image from "next/image";
import Link from "next/link";
import React from "react";
import img1 from "../public/images/code.jpg";
import Author from "./_child/Author";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore,{Autoplay} from "swiper";
import "swiper/css";


export default function Section1() {

    SwiperCore.use([Autoplay])

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
            delay:4000
          }}
        >
          <SwiperSlide>{Slide()}</SwiperSlide>
          <SwiperSlide>{Slide()}</SwiperSlide>
          <SwiperSlide>{Slide()}</SwiperSlide>
          
        </Swiper>
        
      </div>
    </section>
  );
}

function Slide() {
  return (
    <div className="grid md:grid-cols-2">
      <div className="image">
        <Link href="/" legacyBehavior>
          <a>
            <Image src={img1} alt="" width={600} height={600} />
          </a>
        </Link>
      </div>
      <div className="info">
        <div className="cat flex gap-6">
          <Link href="/" legacyBehavior>
            <a className="text-orange-600 hover:text-orange-800">
              Business, Information
            </a>
          </Link>

          <Link href="/" legacyBehavior>
            <a className="text-gray-600 hover:text-gray-800">10,February</a>
          </Link>
        </div>
        <div className="title">
          <Link href="/" legacyBehavior>
            <a className="text-3xl md:text-6xl font-bold text-gray-800 hover:text-gray-600">
              Delivery App (Courier side)
            </a>
          </Link>
        </div>
        <p className="text-gray-500 py-3 mr-30">
          Online app solution that enables the users to order from local vendors
          for food or X type of delivery using an app or web panel.
        </p>
        <Author />
      </div>
    </div>
  );
}
