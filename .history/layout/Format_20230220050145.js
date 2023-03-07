import React from "react";
import Header from "@/components/Header";
import Header2 from "@/components/Header2";
import Footer from "@/components/Footer";
import Footer2 from "@/components/Footer2";
import Head from "next/head";
import UserContextProvider from "@/contexts/UserContext";
import PortfolioContextProvider from "@/contexts/BlogContext";
import { Amplify ,AuthModeStrategyType} from "aws-amplify";
// import { withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from "../src/aws-exports";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure({
  ...awsconfig,
  ssr: true,
});

export default function Format({ children }) {
  return (
    <UserContextProvider>
      <PortfolioContextProvider>
        <>
          <Head>Blog</Head>
          <Header2 />
          <main className="main">{children}</main>
          <Footer2 />
        </>
      </PortfolioContextProvider>
    </UserContextProvider>
  );
}
