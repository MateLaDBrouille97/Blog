import React from "react";
import Header from "@/components/Header";
import Header2 from "@/components/Header2";
import Footer from "@/components/Footer";
import Footer2 from "@/components/Footer2";
import Footer3 from "@/components/Footer3";
import Head from "next/head";



export default function Format({ children }) {
  return (
    
        <>
          <Head>Blog</Head>
          <Header2 />
          <main className="main">{children}</main>
          <Footer3 />
        </>
      
  );
}
