import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import Format from "../layout/Format";
import Section1 from "../components/Section1";
import Section2 from "../components/Section2";
import Section3 from "../components/Section3";
import Section4 from "../components/Section4";
import Section0 from "../components/Section0";



const inter = Inter({ subsets: ["latin"] });



export async function getServerSideProps() {
  const response = await fetch("http://localhost:3001/api/getBlogArticles");
  if (!response.ok) {
    throw new Error("Failed to fetch data in Home");
  }
  const articles = await response.json();
  return { props: { articles } }
}

export default function Home({articles}) {

  
  return (
    
        <Format>
          <Section0 />
          <Section1 blogArt={articles}/>
          <Section2 blogArt={articles}/>
          <Section3 blogArt={articles}/>
          <Section4 blogArt={articles}/>  
        </Format>
     
  );
}


