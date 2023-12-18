'use client';
import React, { useEffect, useState, useMemo } from "react";
import styles from '../styles/page.module.scss'
import Image from 'next/image';
import Lenis from '@studio-freight/lenis'
import Slide from "./Slide";
import SlideBA from "./SlideBA";
import PostsCardBA from "./PostsCardBA";
import PostsCard from "./PostsCard";
import { useBlogContext } from "../contexts/BlogContext";


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



  useEffect( () => {
    const lenis = new Lenis()

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, [])

  return (
    <main className={styles.main}>
      <div className={styles.spacer}></div>
      <div className={styles.gallery}>
        <div className={styles.galleryWrapper}>
          <Column trending={[trending[0], trending[1], trending[2]]}/>
          <Column trending={[trending[3], trending[4], trending[5]]}/>
          <Column trending={[trending[6], trending[7], trending[8]]}/>
          <Column trending={[trending[9], trending[10], trending[11]]}/>
        </div>
      </div>
      <div className={styles.spacer}></div>
    </main>
  )
}

const Column = ({trending}) => {
  return (
    <div 
      className={styles.column}
      >
      {trending &&
        trending.map( (post, i) => {
          return <div key={i} className={styles.imageContainer}>
             {(post?.isPublished?<PostsCardBA post={post} index={index} />:<PostsCard post={post} index={index} />)}
          </div>
        })
      }
    </div>
  )
}