"use client";

import Format from "../../../../layout/Format";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BlogArticle from "./_components/blogArticle-layout";
import { API_URL } from "../../../../config/index";
import { useParams } from "next/navigation";

// export async function getServerSideProps({ params }) {
//   const { BlogArticleId } = params;
//   const response = await fetch(
//     `${API_URL}/api/getBlogArticle?BlogArticleId=${BlogArticleId}`
//   );
//   if (!response.ok) {
//     throw new Error("Failed to fetch data in category");
//   }
//   const blogArt = await response.json();

//   const response2 = await fetch(`${API_URL}/api/getBlogArticles`);
//   if (!response2.ok) {
//     throw new Error(`Failed to fetch total data in ${BlogArticleId}`);
//   }
//   const articles = await response2.json();

//   return { props: { blogArt, articles } };
// }



async function getArticles() {
  const res = await fetch('/api/articles')
  return res.json()
}

async function getArtist() {
  const res = await fetch('/api/author')
  return res.json()
}

async function getArticle(articles:any,BlogArticleId:any) {
  const article = articles.filter((article) => {
    return article?.id == BlogArticleId;
  });
  return article[0];
}



function BlogArticleLayout() {

  const params= useParams();
  //   const { userId } = auth();

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);


  const [user,setUser]=useState();
  const [articles,setArticles]=useState([]);
  const [article,setArticle]=useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const author=await getArtist();
        setUser(author);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchArticles = async () => {
      try {
        const articles=await getArticles();
        setArticles(articles);
      } catch (error) {
        console.error(error);
      }
    };

    

    fetchUser();
    fetchArticles();
    
  }, [params, params?.BlogArticleId]);


  useEffect(()=>{
    const fetchArticle = async () => {
      try {
        
          const article=await getArticle(articles,params.BlogArticleId);
       
        setArticle(article);
        
        
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticle();

  },[articles,params.BlogArticleId])

  return (
    <>
      <Format user={user}>
        {article&&<BlogArticle articles={articles} blogArt={article} />}
      </Format>
    </>
  );
}

export default BlogArticleLayout;
