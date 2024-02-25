import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Format from "../layout/Format";
import Section1 from "../components/Section1";
import Section2 from "../components/Section2";
import Section3 from "../components/Section3";
import Section4 from "../components/Section4";
import Section0 from "../components/Section0";
// import Parallax1 from "../components/Parallax1";
import { API_URL } from "../config/index";
// import SectionIntro from "../components/SectionIntro";
import Zoomparallax from "../components/ZoomParallax";
import Otomata from "../components/Otomata";
import OtoDescription from "../components/OtoDescription";
import Lenis from '@studio-freight/lenis'
import { useRef,useEffect,useState } from 'react';


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


//   useEffect( () => {
//     const lenis = new Lenis()
   
//     function raf(time) {
//         lenis.raf(time)
//         requestAnimationFrame(raf)
//     }

//     requestAnimationFrame(raf)
// },[])
  
const [user,setUser]=useState();

useEffect(() => {
  const fetchUser = async () => {
    try {
      const response = await fetch('/api/author');
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
           <Zoomparallax/>
           <Otomata/>
           <OtoDescription/>
        </Format>
     
    </>
    
  );
}


