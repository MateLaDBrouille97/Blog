import React,{useEffect,useState} from "react";
// import Header from "../components/Header";
// import Header2 from "../components/Header2";
// import Footer from "../components/Footer";
import Footer2 from "../components/Footer2";
import Header3 from "../components/Header3";
import Header2 from "../components/HeaderAnim";
import Head from "next/head";
import ScrollUp from "../components/ScrollUp";
// import { ThemeProvider } from "@/providers/dark-theme";


export default function Format({ children ,user}) {






  return (
    <>
      <Head>Blog</Head>
      <Header3 user2={user}/>
      <main className="main">{children}</main>
      <Footer2 />
      <ScrollUp />
    </>
  );
}
