import Container from "@/components/Container";
import { getTermsOfServices } from "../_components/utils";
import { MainNav } from "@/components/main-nav";
import { CustomMDX } from "@/components/mdx";
import { Metadata } from "next";
import Footer from "../_components/Footer";

export const metadata: Metadata = {
  title: "Terms Of Services",
  description: "This page explains the terms of use of the site.",
};

export default function Page() {
  let post = getTermsOfServices().find(
    (post) => post.slug === "terms-of-services"
  );

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