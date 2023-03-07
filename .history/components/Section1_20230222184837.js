import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
import { useBlogContext } from "@/contexts/BlogContext";
import { useUserContext } from "@/contexts/UserContext";
import { DataStore } from "aws-amplify";
import { User } from "@/src/models";

export default function Section1() {
  SwiperCore.use([Autoplay]);

  const{blogUFH,
    blogP,
    blogN,
    }=useBlogContext();

    const blogList1=blogUFH.length>1?blogUFH.slice(0, 2):blogUFH.slice(0, 1);
    const blogList2=blogP.length>1?blogP.slice(0, 2):blogP.slice(0, 1)
    const blogList3=blogN.length>1?blogN.slice(0, 2):blogN.slice(0, 1)

    const trending=[blogList1,blogList2,blogList3];
    console.log(blogUFH?.length)

  // const { data, isLoading, isError } = fetcher("api/trending");
  // if (isLoading) return <Spinner />;
  // if (isError) return <Error />;

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
          {trending && trending.map((post, index) => (<SwiperSlide key={index}>
            <Slide post={post} key={post.id}/>
          </SwiperSlide>)
            
          )}
          
          
        </Swiper>
      </div>
    </section>
  );
}

function Slide({post}) {

  const aws = require("aws-sdk");
  const s3 = new aws.S3();
  const { dbUser } = useUserContext();
  const [date, setDate] = useState("");
  const [user, setUser] = useState("");
  const [postImage, setPostImage] = useState("");

  useEffect(() => {
    const convertAwsDateToDate = (awsDate) => {
      if(awsDate)
      {const year = awsDate.substring(0, 4);
      const month = awsDate.substring(5, 7) - 1; // Subtract 1 since months are zero-indexed
      const day = awsDate.substring(8, 10);
      const newDate = new Date(year, month, day).toLocaleDateString();
      setDate(newDate);}
    };
    convertAwsDateToDate(post?.createdAt);
  }, [post]);

  useEffect(() => {
    const fetchUser = async () => {
      await DataStore.query(User, (user) => user.id.eq(post?.userID)).then(
        (user) => setUser(user[0])
      );
    };
    fetchUser();
  }, []);

  /* Fetch Image */
  aws.config.update({
    accessKeyId: "AKIAQK7EQ4DINBSQQM5L",
    secretAccessKey: "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",
  });

  useEffect(() => {
    const fetchImage = async () => {
      const params = {
        Bucket: "portfolioml26151fd83d4a40cb89e358a0b8c234d582358-staging",
        Key: post?.image,
      };
      await s3
        .getSignedUrlPromise("getObject", params)
        .then((i) => setPostImage(i));
    };
    fetchImage();
  }, [dbUser]);

  return (
    <div className="grid md:grid-cols-2">
      <div className="image">
        <Link href={`/Posts/${post?.id}`} legacyBehavior>
          <a>
            <Image src={postImage} alt="" width={600} height={600} />
          </a>
        </Link>
      </div>
      <div className="info">
        <div className="cat flex gap-6">
          <Link href="/" legacyBehavior>
            <a className="text-orange-600 hover:text-orange-800">
            {post?.category||"UnKnown"}
            </a>
          </Link>

          <Link href="/" legacyBehavior>
            <a className="text-gray-600 hover:text-gray-800">{date||"UnKnown"}</a>
          </Link>
        </div>
        <div className="title">
          <Link href={`/Posts/${post?.id}`} legacyBehavior>
            <a className="text-3xl md:text-6xl font-bold text-gray-800 hover:text-gray-600">
            {post?.title}
            </a>
          </Link>
        </div>
        <p className="text-gray-500 py-3 mr-20">
        {post?.description}
        </p>
        {user ? <Author author={user} /> : <></>}
      </div>
    </div>
  );
}
