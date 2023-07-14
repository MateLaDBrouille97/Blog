import React, { useEffect } from 'react';
import Header from "@/components/Header";
import Header2 from "@/components/Header2";
import Footer from "@/components/Footer";
import Footer2 from "@/components/Footer2";
import Header3 from "@/components/Header3";
import Head from "next/head";
import ScrollUp from "@/components/ScrollUp";


export default function Format({ children }) {

  useEffect(() => {
    document.documentElement.style.zoom = '75%';

    return () => {
      document.documentElement.style.zoom = ''; // Reset the zoom level when the component is unmounted
    };
  }, []);


  return (
    
    <>
      <Head>Blog</Head>
      <Header3 />
      <main className="main">{children}</main>
      <Footer2 />
      <ScrollUp />
    </>
  );
}
