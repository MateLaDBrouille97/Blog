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
  const { blogUFH, blogP, blogN, blogO, blogG, blogA } = useBlogContext();

 
 

  // const { data, isLoading, isError } = fetcher("api/trending");
  // if (isLoading) return <Spinner />;
  // if (isError) return <Error />;

  //Router animation


  const [blogArticle, setBlogArticle] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    const fetchDataSorted = async () => {
      try {
        const blogArt = await getBlogArticles();
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
  }, []);

  const trending = useMemo(() => {
    const mergeAndSort = (category) => {
      let Ba 
      switch(category){
        case "USEFULHACKS":
           Ba = blogUFH
          break;
        case "PROJECTS":
          Ba = blogP
          break;
        case "NEWS":
          Ba = blogN
        break;
        case "ANALYSIS":
          Ba = blogA
        break;
        case "OPINIONS":
          Ba = blogO
        break;
        case "GEOPOL":
          Ba = blogG
        break;

      }
      
       
      // eslint-disable-next-line react-hooks/rules-of-hooks
      return sortAndSlice([...filteredPosts[category], ...Ba]);
    };

    return [
      ...mergeAndSort("USEFULHACKS"),
      ...mergeAndSort("PROJECTS"),
      ...mergeAndSort("NEWS"),
      ...mergeAndSort("ANALYSIS"),
      ...mergeAndSort("OPINIONS"),
      ...mergeAndSort("GEOPOL"),
    ];
  }, [filteredPosts]);

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
  try {
    const response = await fetch("/api/getBlogArticles");
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const articles = await response.json();
    return articles;
  } catch (error) {
    console.error("Error getting blog articles:", error);
    throw error; // Rethrow the error to handle it elsewhere if needed
  }
}

function filterArticlesByCategory(articles, category) {
  return articles.filter((article) => article?.category?.name === category);
}

function sortAndSlice(blogArray) {
  return blogArray.sort((a, b) => b.createdAt - a.createdAt).slice(0, Math.min(blogArray.length, 2));
}
