import React from "react";
import Header from "@/components/Header";
import Header2 from "@/components/Header2";
import Footer from "@/components/Footer";
import Head from "next/head";
import UserContextProvider from "@/contexts/UserContext";

export default function Format({ children }) {
  return (
    <UserContextProvider>
      <>
        <Head>Blog</Head>
        <Header2 />
        <main className="main">{children}</main>
        <Footer />
      </>
    </UserContextProvider>
  );
}
