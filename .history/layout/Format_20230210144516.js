import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Head from "next/head";

export default function Format() {
  return (
    <>
    <Head>Blog</Head>
      <Header />
      <main className="main"></main>
      <Footer />
    </>
  );
}
