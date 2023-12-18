import React, { useEffect, useState, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, EffectCoverflow, Navigation } from "swiper";
import "swiper/css";
// import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { useBlogContext } from "../contexts/BlogContext";
import { useRouter } from "next/router";
import Slide from "./Slide";
import SlideBA from "./SlideBA";
import PostsCardBA from "./PostsCardBA";
import PostsCard from "./PostsCard";




function filterArticlesByCategory(articles, category) {
  return articles.filter((article) => article?.category?.name === category);
}

function sortAndSlice(blogArray) {
  return blogArray.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, Math.min(blogArray.length, 2));
}


export default function Section1({blogArt}) {
  SwiperCore.use([Autoplay,Pagination]);

  // const { data, isLoading, isError } = fetcher("api/trending");
  // if (isLoading) return <Spinner />;
  // if (isError) return <Error />;

  //Router animation

  const { blogUFH, blogP, blogN, blogO, blogG, blogA } = useBlogContext();
  const [blogArticle, setBlogArticle] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchDataSorted = async () => {
      try {
        // const blogArt = await getBlogArticles();
        setBlogArticle(blogArt);

        // Combine and filter categories
        const combinedPosts = {
          USEFULHACKS: filterArticlesByCategory(blogArt, "USEFULHACKS"),
          PROJECTS: filterArticlesByCategory(blogArt, "PROJECTS"),
          NEWS: filterArticlesByCategory(blogArt, "NEWS"),
          ANALYSIS: filterArticlesByCategory(blogArt, "ANALYSIS"),
          OPINIONS: filterArticlesByCategory(blogArt, "OPINIONS"),
          GEOPOL: filterArticlesByCategory(blogArt, "GEOPOL"),
        };

        setFilteredPosts(combinedPosts);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state if necessary
      }
    };

    fetchDataSorted();
  }, [blogArt]);

  const trending = useMemo(() => {
    const mergeAndSort = (category) => {
      let Ba;
      switch (category) {
        case "USEFULHACKS":
          Ba = blogUFH;
          break;
        case "PROJECTS":
          Ba = blogP;
          break;
        case "NEWS":
          Ba = blogN;
          break;
        case "ANALYSIS":
          Ba = blogA;
          break;
        case "OPINIONS":
          Ba = blogO;
          break;
        case "GEOPOL":
          Ba = blogG;
          break;
        default:
          Ba = [];
          break;
      }
  
      const filteredCategory = filteredPosts[category] || [];
      
      // Combine and sort data
      const combinedAndSorted = sortAndSlice([...filteredCategory, ...Ba]);
  
      return combinedAndSorted;
    };
  
    return [
      ...mergeAndSort("ANALYSIS"),
      ...mergeAndSort("NEWS"),
      ...mergeAndSort("GEOPOL"), 
      ...mergeAndSort("OPINIONS"),
      ...mergeAndSort("USEFULHACKS"),
      ...mergeAndSort("PROJECTS"),
    ];
  }, [blogA, blogG, blogN, blogO, blogP, blogUFH, filteredPosts]);
  
  // ... (rest of the code) ...




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
          <div className="post_sect3 justify-center">
            <Swiper
              // className="postLine__container3"
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
              {
                trending?.map((post) => (
                  <SwiperSlide key={post?.id}  >
                    {post?.isPublished?<PostsCardBA post={post} key={post?.id} />:<PostsCard post={post} key={post?.id} />}
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      </section>
    </>
  );
}


