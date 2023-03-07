import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Error from "@/components/_child/Error";
import { useBlogContext } from "@/contexts/BlogContext";
import Article from "@/components/Article";
import { getAllArticles } from "@/src/utils/mdx";


export default function Page({posts}) {
  const router = useRouter();
  const postId = router?.query?.PostId;
  const { data } = useBlogContext();
  const [post, setPost] = useState("");
  const [post2, setPost2] = useState("");
  console.log("posts",posts)
  console.log(data)


  useEffect(() => {
    const postsD = async () => {
      if (!router.isReady) return;
      // const posts2 = await getPost();
      const filt = data?.filter((value) => value.id == postId);
      setPost(filt[0]);
      console.log("filt",filt)
      const filt2 = posts?.filter((post1) => post1?.title == post?.title );
      setPost2(filt2[0])
    };
    postsD();
  }, [postId, router.isReady]);

  // if (isLoading) return <Spinner />;
  // if (isError) return <Error />;
   console.log("post2",post);
  

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

export async function getStaticPaths ()  {

  return {
      paths: [], //indicates that no page needs be created at build time
      fallback: 'blocking' //indicates the type of fallback
  }
}