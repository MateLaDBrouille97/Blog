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

export default function Page({fallback}){
  const router = useRouter();
  const postId = router?.query?.PostId;
  const { data, isLoading, isError } = fetcher(`api/posts/${postId}`);
  if (isLoading) return <Spinner />;
  if (isError) return <Error />;

  return(
    <div>
      <Article props={data?.id}/>
    </div>
    
  )

}


 function Article({ props }) {
  const [post, setPost] = useState("");

  useEffect(() => {
    const postsD = async () => {
      const posts2 = await getPost();
      const filt = posts2.filter((value) => value.id == props);
      setPost(filt[0]);
    };
    postsD();
  }, [props]);

  return (
    <Format>
      <section className="container mx-auto md:px-2 py-16 w-1/2">
        <div className="flex justify-center">
          {post?.Author ? <Author author={post?.Author} /> : <></>}
        </div>
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
        {post&&<Related post={post}/>}
      </section>
    </Format>
  );
}

export async function getStaticProps({ params }) {
  const posts = await getPost(params?.PostId);
  return {
    props: {
      fallback:{
        '/api/posts':posts
      }
    },
  };
}

export async function getStaticPaths() {
  const posts = await getPost();
  // console.log(posts);
  const paths = posts.map((value) => {
    return {
      params: {
        PostId: value.id.toString(),
      },
    };
  });
  
  return {
    paths,
    fallback: false,
  };
}
