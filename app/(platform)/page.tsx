"use client"

import { Inter } from "@next/font/google";
import Format from "../../layout/Format";

// import Parallax1 from "../components/Parallax1";
import { API_URL } from "../../config/index";
// import SectionIntro from "../components/SectionIntro";
import Zoomparallax from "../../components/ZoomParallax/page";
import Otomata from "../../components/Otomata/page";
import OtoDescription from "../../components/OtoDescription/page";
import Lenis from '@studio-freight/lenis'
import { useRef,useEffect,useState } from 'react';


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



const MarketingPage = () => {



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
      

      const author=await getArtist();
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

export default MarketingPage;
