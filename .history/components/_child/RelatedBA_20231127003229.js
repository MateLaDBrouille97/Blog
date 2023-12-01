import React, { useEffect, useMemo, useState } from "react";
import { useBlogContext } from "../../contexts/BlogContext";
import Link from "next/link";
import { debounce } from "lodash";
import PostColBA from "../PostColBA";
import PostCol from "../PostCol";

export default function RelatedBA({ post, articles }) {
  const { data } = useBlogContext();
  const [dataSort3, setDataSort3] = useState([]);
  const [related, setRelated] = useState([]);
  const [dataTotal, setDataTotal] = useState([]);

  
  useEffect(() => {
    const fetchDataSorted = async () => {
      try {
        setDataSort3(articles);
      } catch (error) {
        console.error("Error fetching blog articles:", error.message);
      }
    };
    fetchDataSorted();
  }, [articles]);

  useEffect(() => {
    const dataRelated = dataTotal?.filter((value) =>
      (post?.isPublished
        ? value.category === post?.category?.name
        : value.category === post?.category)
    );

    const dataRelated2 = dataRelated.sort((a, b) =>
      b.createdAt.localeCompare(a.createdAt)
    );
    setRelated(dataRelated2);
  }, [post, dataTotal]);

  return (
    <section className="section section4 mx-auto md:px-20 py-16 w-5.5/6">
      <div className="container-section4">
        <div className="flex pb-8 mt-10 mb-20 section1__posts">
          <Link
            href={
              post?.isPublished
                ? `/Categories/${post?.category?.name}`
                : `/Categories/${post?.category}`
            }
            legacyBehavior
          >
            <a className="related__title">
              <h1 className="font-bold text-4xl py-8 text-begin section1__posts-title">
                Related
              </h1>
            </a>
          </Link>
        </div>

        <div className="flex flex-col gap-0.25 related__post">
          {related
            .slice(0, 5)
            .map((postItem) =>
              postItem?.isPublished ? (
                <PostColBA postBA={postItem} key={postItem.id} />
              ) : (
                <PostCol post={postItem} key={postItem.id} />
              )
            )}
        </div>
      </div>
    </section>
  );
}
