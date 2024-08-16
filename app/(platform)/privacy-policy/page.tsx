import Container from "../../../components/Container";
import { getPrivacyPolicy } from "../_components/utils";
import { MainNav } from "../../../components/main-nav";
import { CustomMDX } from "../../../components/mdx";
import { Metadata } from "next";
import Footer from "../../../components/Footer";

export const metadata: Metadata = {
  title: "Privary Policy",
  description: "This page explains the Privacy Policy of the site.",
};

export default function Page() {
  let post = getPrivacyPolicy().find((post) => post.slug === "privacy-policy");

  return (
    <div>
      <Container>
      <MainNav />
      <article className="prose">
        <CustomMDX source={post?.content} />
      </article>
      
    </Container>
    <Footer/>
    </div>
    
  );
}