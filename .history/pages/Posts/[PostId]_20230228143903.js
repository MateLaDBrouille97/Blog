import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Error from "@/components/_child/Error";
import { useBlogContext } from "@/contexts/BlogContext";
import Article from "@/components/Article";
import { getAllPosts } from "@/pages/api/MDXContext";

export default function Page() {
  const router = useRouter();
  const postId = router?.query?.PostId;
  const { data } = useBlogContext();
  // const {  isLoading, isError } = fetcher(`api/posts/${postId}`);

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

// export async function getStaticProps({ params }) {
//   const posts = await getPost(params?.PostId);
//   return {
//     props: {
//       fallback:{
//         '/api/posts':posts
//       }
//     },
//   };
// }

// export async function getStaticPaths() {
//   const data = await DataStore.query(BlogPost)
//   // console.log(posts);
//   const paths = data.map((value) => {
//     return {
//       params: {
//         PostId: value.id.toString(),
//       },
//     };
//   });

//   return {
//     paths,
//     fallback: false,
//   };
// }



export async function getStaticProps(){
    const posts=getAllPosts();

    return{ props: { posts } }
}




