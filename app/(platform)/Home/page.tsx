"use client"

import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Format from "../../../layout/Format";
import Section1 from "../../../components/Section1";
import Section2 from "../../../components/Section2";
import Section3 from "../../../components/Section3";
import Section4 from "../../../components/Section4";
import Section0 from "../../../components/Section0";
// import Section0Bis from "../../components/Section0Bis";
// import Parallax1 from "../components/Parallax1";
import { API_URL } from "../../../config/index";
// import SectionIntro from "../components/SectionIntro";
import Landing from "../../../components/Landing/page"
import React, { useRef,useEffect,useState } from 'react';


const inter = Inter({ subsets: ["latin"] });


// export async function getServerSideProps() {
//   const response = await fetch(`${API_URL}/api/getBlogArticles`);
  
//   if (!response.ok) {
//     throw new Error("Failed to fetch data in Home");
//   }
//   const articles = await response.json();
//   return { props: { articles } }
// }



async function getArtist() {
  const res = await fetch('/api/author')
  return res.json()
}


async function getArticles() {
  const res = await fetch('/api/articles')
  return res.json()
}


export default function Home() {

  const [user,setUser]=useState("");
  const [articles,setArticles]=useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const author=await getArtist();
        setUser(author);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchArticles = async () => {
      try {
        const articles=await getArticles();
        setArticles(articles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
    fetchArticles();
  }, []);

  
  return (
    <>
    
        <Format user={user}>
          <Landing/>
          <Section1 blogArt={articles}/>
          <Section2 blogArt={articles}/>
          <Section3 blogArt={articles}/>
          <Section4 blogArt={articles}/>  
        </Format>
     
    </>
    
  );
}


