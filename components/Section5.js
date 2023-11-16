
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { useBlogContext } from "../contexts/BlogContext";

import { gsap } from "gsap";
import { useRouter } from "next/router";

import PostColMultiple2 from "./PostColMultiple2";

export default function Section5() {
  const { blogP, blogN, blogO, blogA } = useBlogContext();

  //Sort from newest to oldest
  
  const [dataSort2, setDataSort2] = useState([]);
  const [dataSort3, setDataSort3] = useState([]);
 

  useEffect(() => {
    const data1 = blogP.sort((a, b) => {
      if (b.createdAt > a.createdAt) return 1;
      if (b.createdAt < a.createdAt) return -1;
      return 0;
    });
    const data2 = blogN.sort((a, b) => {
      if (b.createdAt > a.createdAt) return 1;
      if (b.createdAt < a.createdAt) return -1;
      return 0;
    });
    const data3 = blogO.sort((a, b) => {
      if (b.createdAt > a.createdAt) return 1;
      if (b.createdAt < a.createdAt) return -1;
      return 0;
    });
    const data4 = blogA.sort((a, b) => {
      if (b.createdAt > a.createdAt) return 1;
      if (b.createdAt < a.createdAt) return -1;
      return 0;
    });
    setDataSort(data1);
    setDataSort2(data2);
    setDataSort3(data3);
    setDataSort4(data4);
  }, [blogP, blogN, blogO, blogA]);

  useEffect(() => {
    const dat1 = dataSort2.slice(0, 3);
    const dat2 = dataSort3.slice(0, 3);
    const slice = [...dat1, ...dat2];
    setDataSlice(slice);
  }, [blogN, blogO, dataSort2, dataSort3]);

  // const { isLoading, isError } = fetcher("api/posts");
  // if (isLoading) return <Spinner />;
  // if (isError) return <Error />;

  // const dataC =data?.filter((post)=>post.Category=="Code");

  // const dataP =data?.filter((post)=>post.Category=="Project");

  //Router animation
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  

  return (
    <>
      <section className="section section4 mx-auto md:px-20 py-16 w-5.5/6">
        <div className="container_section5">
          <div className="item">
            <div className="flex  pb-8 mt-10 mb-20 section1__posts">
              <h1 className="font-bold text-4xl py-8 text-center section1__posts-title">
                News
              </h1>
            </div>
            <div className="section4__posts">
              <div className="flex flex-col gap-1">
                {/* Post */}
                {dataSort2 && dataSort2 ? (
                  <PostColMultiple2 posts={dataSort2} />
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="section3__view mt-5 mb-5">
              <Link href={`/Categories/NEWS`} legacyBehavior>
                <a className="font-bold text-xl py-8 text-center section3__view-title">
                  {" "}
                  View More
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
