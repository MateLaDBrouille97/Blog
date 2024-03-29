import "../styles/globals.css";
import "../styles/styles1.css";
import "../styles/header.css";
import "../styles/header2.css";
import "../styles/linkShare.css";
import "../styles/footer.css";
import "../styles/footer2.css";
import "../styles/category.css";
import "../styles/section0.css";
import "../styles/section1.css";
import "../styles/section2.css";
import "../styles/section3.css";
import "../styles/section4.css";
import "../styles/section5.css";
import "../styles/postId.css";
import "../styles/related.css";
import "../styles/youtube.css";
import "../styles/work.css";
import "../styles/SocialLink.css";
import "../styles/scrollup.css";
import "../styles/scrollBar.css";
import "../styles/like.css";
import "../styles/postVal.css";
import "../styles/BlogArticle.css";
import "../styles/section1bis.scss";
import "../styles/about.scss";
import "../styles/featured.scss";
import "../styles/gallery.scss";
import "../styles/header.scss";
import "../styles/sectionHeader.scss";
import "../styles/home.scss";
import "../styles/cursor.scss";
import "../styles/curve.scss";
import "../styles/footer.scss";
import "../styles/header2.scss";
import "../styles/landing.scss";
import "../styles/link2.scss";
import "../styles/navItems.scss";
import "../styles/zoomparallax.scss";
import "../styles/otomata.css";

import "../styles/paragraph.scss";

import { Amplify } from "aws-amplify";
// import { withAuthenticator } from "@aws-amplify/ui-react";
import awsconfig from "../src/aws-exports";
import "@aws-amplify/ui-react/styles.css";
// import BlogContextProvider from "../contexts/BlogContext";
// import UserContextProvider from "../contexts/UserContext";
import ThemeContextProvider from "../contexts/ThemeContext";
import ThemeProvider from "../providers/ThemeProvider";
// import SmoothScrolling from "../components/SmoothScrolling";
import CustomCursor from "../components/CustomCursor";

Amplify.configure({
  ...awsconfig,
  ssr: true,
});

export default function App({ Component, pageProps }) {
  return (
    <ThemeContextProvider>
      <ThemeProvider>
        <CustomCursor />
        <Component {...pageProps} />
      </ThemeProvider>
    </ThemeContextProvider>
  );
}
