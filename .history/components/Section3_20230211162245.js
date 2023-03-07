import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore,{Autoplay} from "swiper";
import "swiper/css";
import Link from 'next/link';
import Image from 'next/image';
import Author from './_child/Author';
import img1 from "../public/images/code.jpg";

export default function Section3() {
  return (
    <section className="container mx-auto md:px-20 py-16">
<h1 className="font-bold text-4xl py-12 text-center">
        Most Popular
      </h1>
      <Swiper
       slidesPerView={2}
       loop={true}
       autoplay={{
         delay:4000
       }}
      
      >
        <SwiperSlide>{Post()}</SwiperSlide>
        <SwiperSlide>{Post()}</SwiperSlide>
        <SwiperSlide>{Post()}</SwiperSlide>
      </Swiper>
    </section>
  )
}


function Post() {
    return (
      <div className="grid">
        <div className="images">
          <Link href="/" legacyBehavior>
            <a>
              <Image
                src={img1}
                alt=""
                width={600}
                height={400}
                
              />
            </a>
          </Link>
        </div>
        <div className="info flex justify-center flex-col py-4">
          <div className="cat flex gap-6">
            <Link href="/" legacyBehavior>
              <a className="text-orange-600 hover:text-orange-800">
                Business, Informatics
              </a>
            </Link>
            <Link href="/" legacyBehavior>
              <a className="text-gray-600 hover:text-gray-800">10,February</a>
            </Link>
          </div>
          <div className="title">
            <Link href="/" legacyBehavior>
              <a className="text-xl font-bold text-gray-800 hover:text-gray-600">
                Delivery App (Courier side)
              </a>
            </Link>
          </div>
          <p className="text-gray-500 py-3">
            Online app solution that enables the users to order from local vendors
            for food or X type of delivery using an app or web panel.
          </p>
          <Author />
        </div>
      </div>
    );
  }