import "@/styles/globals.css";
import "@/styles/styles1.css";
import "@/styles/header.css";
import "@/styles/linkShare.css";
import "@/styles/footer.css";
import "@/styles/footer2.css";
import "@/styles/category.css";
import "@/styles/section1.css";
import "@/styles/section2.css";
import "@/styles/section3.css";
import "@/styles/section4.css";
import "@/styles/postId.css";
import "@/styles/related.css";
import "@/styles/youtube.css";
import "@/styles/work.css";
import "@/styles/SocialLink.css";
import "@/styles/scrollup.css";


import { Amplify } from "aws-amplify";
// import { withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from "../src/aws-exports";
import "@aws-amplify/ui-react/styles.css";
import BlogContextProvider from "@/contexts/BlogContext";
import UserContextProvider from "@/contexts/UserContext";

Amplify.configure({
  ...awsconfig,
  ssr: true,
});

export default function App({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <BlogContextProvider>
        <Component {...pageProps} />
      </BlogContextProvider>
    </UserContextProvider>
  );
}
