import "@/styles/globals.css";
import "@/styles/styles1.css";
import "@/styles/header.css";
import "@/styles/linkShare.css";
import "@/styles/footer.css";
import "@/styles/category.css";
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
