import React, { useEffect, useState } from "react";
import Format from "@/layout/Format";
import Author from "@/components/_child/Author";
import Image from "next/image";
import Related from "@/components/_child/Related";
import img1 from "../../public/images/code.jpg";
import helper from "lib/helper";
import getPost from "lib/helper";
import fetcher from "@/lib/fetcher";
import { useRouter } from "next/router";
import Spinner from "@/components/_child/Spinner";
import Error from "@/components/_child/Error";
import { SWRConfig } from "swr";
import { useBlogContext } from "@/contexts/BlogContext";
import { DataStore } from "aws-amplify";
import { BlogPost } from "@/src/models";

export default function Page(){
  const router = useRouter();
  const postId = router?.query?.PostId;
  const {data} =useBlogContext()
  const {  isLoading, isError } = fetcher(`api/posts/${postId}`);
  
  const [post, setPost] = useState("");
  const [posts,setPosts]=useState([]);

  console.log(posts);
  console.log("data",data )

  useEffect(() => {
    const postsD = async () => {
      if (!router.isReady) return;
      // const posts2 = await getPost();
      await DataStore.query(BlogPost).then(posts=>setPosts(posts));
      const filt = data.filter((value) => value.id ==postId );
      setPost(filt[0]);
    };
    postsD();
  }, [router.query.CategoryName, router.isReady]);


  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  return(
    <div>
      <Article post={post}/>
    </div>
  )
}


 function Article({ post }) {
  

  return (
    <Format>
      <section className="container mx-auto md:px-2 py-16 w-1/2">
       
        <div className="post py-10">
          <h1 className="font-bold text-4xl text-center pb-5">{post?.title}</h1>
          <p className="text-gray-500 text-xl text-center"> {post?.subtitle}</p>
          <div className="py-10">
            <Image src={post?.img} alt="" width={900} height={600} />
          </div>
          
          <div className="content text-gray-600 text-lg flex flex-col gap-4">
            {post?.description}
          </div>
        </div>
        <div className="flex justify-end">
          {post?.Author ? <Author author={post?.Author} /> : <></>}
        </div>
        {post&&<Related post={post}/>}
      </section>
    </Format>
  );
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
