import React, { useEffect, useState, useMemo } from "react";
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
import SlideBA from "./SlideBA";


export default function Section1() {
  SwiperCore.use([Autoplay]);

  const [blogArticle, setBlogArticle] = useState([]);
  const [postsUfh, setPostsUFH] = useState([]);
  const [postsProj, setPostsProj] = useState([]);
  const [postsNews1, setPostsNews1] = useState([]);
  const [postsNews2, setPostsNews2] = useState([]);
  const [postsNews3, setPostsNews3] = useState([]);
  const [postsNews4, setPostsNews4] = useState([]);
 
  const [postsTools, setPostsTools] = useState([]);
  const [postsfiltered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchDataSorted = async () => {
      const blogArt = await getBlogArticles();
      // const blogArt = await getCategories()
      setBlogArticle(blogArt);
    };
    fetchDataSorted();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filteredArticles1 = blogArticle.filter((article) => {
          return article?.category?.name === "USEFULHACKS";
        });
        setPostsUFH(filteredArticles1);

        const filteredArticles2 = blogArticle.filter((article) => {
          return article?.category?.name === "PROJECTS";
        });
        setPostsProj(filteredArticles2);

        const filteredArticles3 = blogArticle.filter((article) => {
          return (
            (article?.category?.name === "NEWS") 
          );
        });
        setPostsNews1(filteredArticles3);

        const filteredArticles5 = blogArticle.filter((article) => {
          return article?.category?.name === "ANALYSIS";
        });
        setPostsNews2(filteredArticles3);

        const filteredArticles6 = blogArticle.filter((article) => {
          return article?.category?.name === "OPINIONS";
        });
        setPostsNews3(filteredArticles3);

        const filteredArticles7 = blogArticle.filter((article) => {
          return (article?.category?.name === "GEOPOL")
        });
        setPostsNews4(filteredArticles3);

        const filteredArticles4 = blogArticle.filter((article) => {
          return article?.category?.name === "TOOLS";
        });
        setPostsTools(filteredArticles4);

        const filteredData = blogArticle.filter((item) => {
          return item?.title
            ?.toLowerCase()
            .includes(categoryName?.toLowerCase());
        });
        setFiltered(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state if necessary
      }
    };

    fetchData();
  }, [blogArticle]);

  const { blogUFH, blogP, blogN, blogO, blogG, blogA } = useBlogContext();

  const postsUFH = [...postsUfh, ...blogUFH];
  const postsP = [...postsProj, ...blogP];
  const blogmerge1 = [...postsNews1, ...blogN];
  const blogmerge2 = [...postsNews2, ...blogA ];
  const blogmerge3 = [...postsNews3,  ...blogO ];
  const blogmerge4 = [...postsNews4,  ...blogG];
 

  const sortAndSlice = (blogArray) =>
    blogArray
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, Math.min(blogArray.length, 2));

  const trending = useMemo(
    () => [
      ...sortAndSlice(blogmerge1),
      ...sortAndSlice(blogmerge2),
      ...sortAndSlice(blogmerge4),
      ...sortAndSlice(postsUFH),
      ...sortAndSlice(blogmerge3),
      ...sortAndSlice(postsP),
    ],
    [blogmerge1, blogmerge2, blogmerge4, postsUFH, blogmerge3, postsP]
  );

  // const { data, isLoading, isError } = fetcher("api/trending");
  // if (isLoading) return <Spinner />;
  // if (isError) return <Error />;

  //Router animation

  const bg = {
    background: "url('//marek-piwnicki-WiZOyYqzUss-unsplash.jpg')",
  };
  return (
    <>
      <section
        className="section section4 mx-auto md:px-20 py-16 w-5.5/6 background-img"
        id="section1"
      >
        <div className="container-section4">
          <div className="flex justify-center pb-8 mt-10 mb-20 section1__posts">
            <h1 className="font-bold text-4xl text-center section1__posts-title">
              Trending
            </h1>
          </div>
          <div className="swiper__section1">
            <Swiper
              className="postLine__container3"
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
                  slidesPerView: 1,
                },
              }}
              modules={[Pagination]}
            >
              {trending &&
                trending.map((post, index) => (
                  <SwiperSlide key={index}>
                    {(post.isPublished?<SlideBA post={post} key={post.id} />:<Slide post={post} key={post.id} />)}
                  </SwiperSlide>
                ))}
            </Swiper>
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
