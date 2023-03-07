import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";

export default function Format({children}) {
  return (
    <>
      <Head>Blog</Head>
      <Header />
      <main className="main">
        {children}
      </main>
      <Footer />
    </>
  );
}
