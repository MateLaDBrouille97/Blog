"use client";
import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useLayoutEffect,
  useCallback,
} from "react";
import styles from "../styles/page.module.scss";
import { motion, useTransform, useAnimation } from "framer-motion";
import { useBlogContext } from "../contexts/BlogContext";
import { useScroll } from "framer-motion";
import { useWindowSize } from "@studio-freight/hamo";
import PostsCardBA from "./PostsCardBA";
// import PostsCardBAlight from "./PostsCardBAlight";
import PostsCard from "./PostsCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import Image from "next/image";
import Lenis from "@studio-freight/lenis";
import Slide from "./Slide";
import SlideBA from "./SlideBA";

import { ArrowRight } from "lucide-react";

function filterArticlesByCategory(articles, category) {
  return articles.filter((article) => article?.category?.name === category);
}

function sortAndSlice(blogArray) {
  return blogArray
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, Math.min(blogArray.length, 3));
}

export default function Parallax1({ blogArt }) {
  const { blogUFH, blogP, blogN, blogO, blogG, blogA } = useBlogContext();
  const [blogArticle, setBlogArticle] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [lenis, setLenis] = useState(null)
  

  useEffect(() => {
    const fetchDataSorted = async () => {
      try {
        // const blogArt = await getBlogArticles();
        setBlogArticle(blogArt);

        // Combine and filter categories
        const combinedPosts = {
          USEFULHACKS: filterArticlesByCategory(blogArt, "USEFULHACKS"),
          // PROJECTS: filterArticlesByCategory(blogArt, "PROJECTS"),
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
        // case "PROJECTS":
        //   Ba = blogP;
        //   break;
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
      // ...mergeAndSort("PROJECTS"),
    ];
  }, [blogA, blogG, blogN, blogO, blogUFH, filteredPosts]);

  // ... (rest of the code) ...

  const gallery = useRef(null);
  const [dimension, setDimension] = useState({width:0, height:0});

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start']
  })
  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3])

  useEffect( () => {
    const lenis = new Lenis()

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const resize = () => {
      setDimension({width: window.innerWidth, height: window.innerHeight})
    }

    window.addEventListener("resize", resize)
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    }
  }, [])

  
  return (
    <main className={styles.main}>
      <div className={styles.spacer}></div>
      <div ref={gallery} className={styles.gallery}>
        <Column
          trending={[blogArt[0], blogArt[1], blogArt[2], blogArt[3]]}
          y={y}
        />
        <Column
          trending={[blogArt[4], blogArt[5], blogArt[6], blogArt[7]]}
          y={y2}
        />
        <Column
          trending={[blogArt[8], blogArt[9], blogArt[10], blogArt[11]]}
          y={y3}
        />
        <Column trending={[blogArt[12], blogArt[13], blogArt[14]]} y={y4} />
      </div>
      <div className={styles.spacer}></div>
    </main>
  );
}

const Column = ({ trending, y }) => {
  return (
    <motion.div className={styles.column} style={{ y }}>
      {trending &&
        trending.map((post, index) => {
          return (
            <div key={index} className={styles.imageContainer}>
              {<PostsCardBAlight post={post} index={index} />}
            </div>
          );
        })}
    </motion.div>
  );
};

const PostsCardBAlight = ({ post, index }) => {
  return (
    <main2 className="flex justify-center items-start">
      <div className="card">
        {post?.imageUrl && (
          <Image
            src={post?.imageUrl}
            height={900}
            width={900}
            alt="blog image"
            className="rounded-sm"
          />
        )}
        <div className="card-content ">
          <h3>
            <a
              href={`/Categories/${
                post?.category?.name == "OPINIONS" ||
                post?.category?.name == "ANALYSIS" ||
                post?.category?.name == "GEOPOL"
                  ? "NEWS"
                  : post?.category?.name
              }`}
              className="text-orange-900 hover:text-orange-800 color-top"
              onclick="lenis.scrollTo('#anchor')"
            >
              {post?.category?.name || "UnKnown"}
            </a>
          </h3>

          <h2>
            {post?.title?.substring(0, 29) +
              (post?.title?.length > 29 ? "..." : "")}
          </h2>

          <a
            href={`/BlogArticles/${post?.id}`}
            onclick="lenis.scrollTo('#anchor')"
            className="find-out-more"
          >
            Find out more{"   "}
            <span>
              <ArrowRight className="material-symbols-outlined " />
            </span>
          </a>
        </div>
      </div>
    </main2>
  );
};
