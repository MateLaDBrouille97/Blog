import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Format from "../../layout/Format";
import Section1 from "../../components/Section1";
import Section2 from "../../components/Section2";
import Section3 from "../../components/Section3";
import Section4 from "../../components/Section4";
import Section0 from "../../components/Section0";
// import Section0Bis from "../../components/Section0Bis";
// import Parallax1 from "../components/Parallax1";
import { API_URL } from "../../config/index";
// import SectionIntro from "../components/SectionIntro";
import Landing from "../../components/Landing"
import React, { useRef,useEffect,useState } from 'react';


const inter = Inter({ subsets: ["latin"] });


export async function getServerSideProps() {
  const response = await fetch(`${API_URL}/api/getBlogArticles`);
  if (!response.ok) {
    throw new Error("Failed to fetch data in Home");
  }
  const articles = await response.json();
  return { props: { articles } }
}

export default function Home({articles}) {

  const [user,setUser]=useState();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`${API_URL}/api/author`);
        const author = await response.json();
        setUser(author);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
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


