import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Error from "@/components/_child/Error";
import { useBlogContext } from "@/contexts/BlogContext";
import Article from "@/components/Article";
import { getAllArticles } from "@/src/utils/mdx";


export default function Page() {
  const router = useRouter();
  const postId = router?.query?.PostId;
  const { data } = useBlogContext();

  const [post, setPost] = useState("");

  useEffect(() => {
    const postsD = async () => {
      if (!router.isReady) return;
      // const posts2 = await getPost();
      const filt = data?.filter((value) => value.id == postId);
      setPost(filt[0]);
      
    };
    postsD();
  }, [postId, router.isReady]);

  // if (isLoading) return <Spinner />;
  // if (isError) return <Error />;

  

  return <div>{post ? <Article post={post} /> : <Error />}</div>;
}



export async function getStaticProps() {
  const articles = await getAllArticles()
  console.log(articles)

  articles
    .map((article) => article.data)
    .sort((a, b) => {
      if (a.data.publishedAt > b.data.publishedAt) return 1
      if (a.data.publishedAt < b.data.publishedAt) return -1

      return 0
    })

  return {
    props: {
      posts: articles.reverse(),
    },
  }
}

export const getStaticPaths = async () => {

  return {
      paths: [], //indicates that no page needs be created at build time
      fallback: 'blocking' //indicates the type of fallback
  }
}