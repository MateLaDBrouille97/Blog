import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import Format from "@/layout/Format";
import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";
import Section3 from "@/components/Section3";
import Section4 from "@/components/Section4";
import UserContextProvider from "@/contexts/UserContext";
import BlogContextProvider from "@/contexts/BlogContext";
import { Amplify, AuthModeStrategyType } from "aws-amplify";
// import { withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from "../src/aws-exports";
import "@aws-amplify/ui-react/styles.css";

Amplify.configure({
  ...awsconfig,
  ssr: true,
});

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <UserContextProvider>
      <BlogContextProvider>
        <Format>
          <Section1 />
          <Section2 />
          <Section3 />
          <Section4 />
        </Format>
      </BlogContextProvider>
    </UserContextProvider>
  );
}
