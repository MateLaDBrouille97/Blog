import React, { useEffect, useMemo, useState } from "react";
import { categoriesName } from "@/public/blogDataName";
import { useRouter } from "next/router";
import { useBlogContext } from "@/contexts/BlogContext";
import Category from "./components/Category"

export default function CategoryName() {
  const router = useRouter();
  const categoryName = router?.query?.CategoryName;
  // const { categoriesName } = blogData;
  const { blogUFH, blogP, blogN, data, blogO, tools, blogA, blogG } =
    useBlogContext();
  const [cat, setCat] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const postsD = () => {
      if (!router.isReady) return;
      const filt = categoriesName?.filter(
        (value) => value?.name == categoryName
      );
      setCat(filt?.[0]);

      switch (categoryName) {
        case "USEFULHACKS":
          setPosts(blogUFH);
          break;
        case "PROJECTS":
          setPosts(blogP);
          break;
        case "NEWS":
          const blogmerge = [...blogN, ...blogO, ...blogA, ...blogG];
          setPosts(blogmerge);
          break;
        case "POSTS":
          setPosts(data);
          break;
        case "TOOLS":
          setPosts(tools);
          break;
        default:
          // If categoryName doesn't match any of the above cases,
          // filter the data based on the title
          const filteredData = data.filter((item) =>
            item?.title?.toLowerCase().includes(categoryName?.toLowerCase())
          );
          setPosts(filteredData);
          break;
      }
    };
    postsD();
  }, [router.query.CategoryName, router.isReady, data]);

  

  return (
    <>
      <div
        id={
          router?.query?.CategoryName == "USEFULHACKS"
            ? "usefulHacks"
            : router?.query?.CategoryName == "PROJECTS"
            ? "projects"
            : "news"
        }
      >
        {cat ? (
          <Category category={cat} posts={posts} key={cat?.id} />
        ) : (
          <Category
            category={categoriesName?.[4]}
            posts={posts}
            key={cat?.id}
          />
        )}
      </div>
    </>
  );
}

