'use client';
import React, { useEffect, useState, useMemo,useRef } from "react";
import styles from '../styles/page.module.scss'
import Image from 'next/image';
import Lenis from '@studio-freight/lenis'
import Slide from "./Slide";
import SlideBA from "./SlideBA";
import PostsCardBA from "./PostsCardBA";
import PostsCard from "./PostsCard";
import { useBlogContext } from "../contexts/BlogContext";
import { useTransform, useScroll, motion } from 'framer-motion';


function filterArticlesByCategory(articles, category) {
  return articles.filter((article) => article?.category?.name === category);
}

function sortAndSlice(blogArray) {
  return blogArray.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, Math.min(blogArray.length, 2));
}

export default function Parallax1({blogArt}) {


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
          <Column trending={[trending[0], trending[1], trending[2]]} y={y}/>
          <Column trending={[trending[3], trending[4], trending[5]]}  y={y2}/>
          <Column trending={[trending[6], trending[7], trending[8]]} y={y3}/>
          <Column trending={[trending[9], trending[10], trending[11]]} y={y4}/>
        </div>
      <div className={styles.spacer}></div>
    </main>
  )
}

const Column = ({trending, y}) => {
  return (
    <motion.div 
    className={styles.column}
    style={{y}}
    >
      {trending &&
        trending.map( (post, index) => {
          return <div key={index} className={styles.imageContainer}>
             {(post?.isPublished?<PostsCardBA post={post} index={index} />:<PostsCard post={post} index={index} />)}
          </div>
        })
      }
    </motion.div>
  )
}