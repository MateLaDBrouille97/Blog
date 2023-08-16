import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Format from "@/layout/Format";
import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";
import Section3 from "@/components/Section3";
import Section4 from "@/components/Section4";
import Section5 from "@/components/Section5";
import UserContextProvider from "@/contexts/UserContext";
import BlogContextProvider from "@/contexts/BlogContext";
import Section from "@/components/Section0";
import Section0 from "@/components/Section0";



const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    
        <Format>
          <Section0 />
          <Section1 />
          <Section2 />
          <Section3 />
          <Section4 />
        </Format>
     
  );
}
