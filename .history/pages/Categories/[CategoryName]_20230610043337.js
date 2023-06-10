import Author from "@/components/_child/Author";
import Related from "@/components/_child/Related";
import Format from "@/layout/Format";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { categoriesName } from "@/public/blogDataName";
import { useRouter } from "next/router";
import { useBlogContext } from "@/contexts/BlogContext";
import Link from "next/link";
import Error from "@/components/_child/Error";
import { useUserContext } from "@/contexts/UserContext";
import { DataStore } from "aws-amplify";
import { User } from "@/src/models";
import Post3col from "@/components/Post3Col";
import { gsap } from "gsap";
import {
  subCategoryNews,
  subCategoryHacks,
  subCategoryProject,
  subCategoryTools,
} from "@/public/subCategoryName";
import ScrollBar from "@/components/_child/Dropdown";
import Dropdown from "@/components/_child/Dropdown";
import PostCol from "@/components/PostCol";
import PostCol2 from "@/components/PostCol2";
import Pagination from "@/components/Pagination";
import PostVal from "@/components/PostVal";

export default function CategoryName() {
  const router = useRouter();
  const categoryName = router?.query?.CategoryName;
  // const { categoriesName } = blogData;
  const { blogUFH, blogP, blogN, data, blogO, tools } = useBlogContext();
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
          const blogmerge = [...blogN, ...blogO];
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
            item.title.toLowerCase().includes(categoryName.toLowerCase())
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

function Category({ category, posts }) {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [active, setActive] = useState(0);
  const [item, setItem] = useState({ name: "All" });

  useEffect(() => {
    let timer;
    const aniStart = async () => {
      timer = setTimeout(() => {
        setIsActive(true);
        const tl = gsap.timeline();
        tl.to(".cover-strip", {
          yPercent: 100,
          duration: 0.8,
          ease: "Expo.easeInOut",
          stagger: 0.1,
        });
      }, 300);
    };
    const aniEnd = () => {
      if (timer) {
        clearTimeout(timer);
      }
      const tl = gsap.timeline();
      if (isActive) {
        tl.to(".cover-strip", {
          yPercent: 200,
          duration: 0.8,
          ease: "Expo.easeInOut",
          stagger: -0.1,
        });
        setIsActive(false);
      }

      tl.set(".cover-strip", { yPercent: 0 });
      clearTimeout(timer);
    };

    router.events.on("routeChangeStart", aniStart);
    router.events.on("routeChangeComplete", aniEnd);
    router.events.on("routeChangeError", aniEnd);

    return () => {
      router.events.off("routeChangeStart", aniStart);
      router.events.off("routeChangeComplete", aniEnd);
      router.events.off("routeChangeError", aniEnd);
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [router]);

  //Sort from newest to oldest

  const [dataSort, setDataSort] = useState([]);

  //---------------------Pagination-----------------------------

  const query = router.query;
  const page = query.page ?? "1";
  const perPage = query.perPage ?? "12";

  // Lines 27-29: Define limit and skip which is used by DummyJSON API for pagination
  const limit = perPage;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const endIndex = skip + limit;
  const itemCount=dataSort?.slice(9);
  const pageData = itemCount?.slice(skip, endIndex);
  

  //------------------------------------------------------------

  useMemo(() => {
    const postsData = () => {
      switch (category?.name) {
        case "USEFULHACKS":
          if (item.name === "productivity") {
            const blog3 = posts.filter((d) => {
              return d?.subCategory?.toLowerCase() === "productivity";
            });
            const data1 = blog3.sort((a, b) => {
              if (b.createdAt > a.createdAt) return 1;
              if (b.createdAt < a.createdAt) return -1;
              return 0;
            });
            setDataSort(data1);
            break;
          } else if (item.name === "assistants") {
            const blog4 = posts.filter((d) => {
              return d?.subCategory?.toLowerCase() === "assistants";
            });
            const data1 = blog4.sort((a, b) => {
              if (b.createdAt > a.createdAt) return 1;
              if (b.createdAt < a.createdAt) return -1;
              return 0;
            });
            setDataSort(data1);
            break;
          } else if (item.name === "all") {
            const data1 = posts.sort((a, b) => {
              if (b.createdAt > a.createdAt) return 1;
              if (b.createdAt < a.createdAt) return -1;
              return 0;
            });
            setDataSort(data1);
            break;
          } else if (item.name === "research tools") {
            const blog4 = posts.filter((d) => {
              return d?.subCategory?.toLowerCase() === "research_tools";
            });
            const data1 = blog4.sort((a, b) => {
              if (b.createdAt > a.createdAt) return 1;
              if (b.createdAt < a.createdAt) return -1;
              return 0;
            });
            setDataSort(data1);
            break;
          } else if (item.name === "copywriting") {
            const blog4 = posts.filter((d) => {
              return d?.subCategory?.toLowerCase() === "copywriting";
            });
            const data1 = blog4.sort((a, b) => {
              if (b.createdAt > a.createdAt) return 1;
              if (b.createdAt < a.createdAt) return -1;
              return 0;
            });
            setDataSort(data1);
            break;
          } else if (item.name === "marketing") {
            const blog4 = posts.filter((d) => {
              return d?.subCategory?.toLowerCase() === "marketing";
            });
            const data1 = blog4.sort((a, b) => {
              if (b.createdAt > a.createdAt) return 1;
              if (b.createdAt < a.createdAt) return -1;
              return 0;
            });
            setDataSort(data1);
            break;
          } else if (item.name === "other") {
            const blog4 = posts.filter((d) => {
              return d?.subCategory?.toLowerCase() === "other";
            });
            const data1 = blog4.sort((a, b) => {
              if (b.createdAt > a.createdAt) return 1;
              if (b.createdAt < a.createdAt) return -1;
              return 0;
            });
            setDataSort(data1);
            break;
          } else if (item.name === "image video") {
            const blog4 = posts.filter((d) => {
              return d?.subCategory?.toLowerCase() === "image_video";
            });
            const data1 = blog4.sort((a, b) => {
              if (b.createdAt > a.createdAt) return 1;
              if (b.createdAt < a.createdAt) return -1;
              return 0;
            });
            setDataSort(data1);
            break;
          }
        case "PROJECTS":
          if (item.name === "app") {
            const blog3 = posts.filter((d) => {
              return d?.subCategory?.toLowerCase() === "app";
            });
            const data1 = blog3.sort((a, b) => {
              if (b.createdAt > a.createdAt) return 1;
              if (b.createdAt < a.createdAt) return -1;
              return 0;
            });
            setDataSort(data1);
            break;
          } else if (item.name === "web") {
            const blog4 = posts.filter((d) => {
              return d?.subCategory?.toLowerCase() === "web";
            });
            const data1 = blog4.sort((a, b) => {
              if (b.createdAt > a.createdAt) return 1;
              if (b.createdAt < a.createdAt) return -1;
              return 0;
            });
            setDataSort(data1);
            break;
          } else if (item.name === "all") {
            const data1 = posts.sort((a, b) => {
              if (b.createdAt > a.createdAt) return 1;
              if (b.createdAt < a.createdAt) return -1;
              return 0;
            });
            setDataSort(data1);
            break;
          } else if (item.name === "analyze") {
            const blog4 = posts.filter((d) => {
              return d?.subCategory?.toLowerCase() === "analyze";
            });
            const data1 = blog4.sort((a, b) => {
              if (b.createdAt > a.createdAt) return 1;
              if (b.createdAt < a.createdAt) return -1;
              return 0;
            });
            setDataSort(data1);
            break;
          } else if (item.name === "ai") {
            const blog4 = posts.filter((d) => {
              return d?.subCategory?.toLowerCase() === "ai";
            });
            const data1 = blog4.sort((a, b) => {
              if (b.createdAt > a.createdAt) return 1;
              if (b.createdAt < a.createdAt) return -1;
              return 0;
            });
            setDataSort(data1);
            break;
          }
        case "NEWS":
          if (item.name === "news") {
            const blog3 = posts.filter((d) => {
              return d?.category.toLowerCase() === "news";
            });
            const data1 = blog3.sort((a, b) => {
              if (b.createdAt > a.createdAt) return 1;
              if (b.createdAt < a.createdAt) return -1;
              return 0;
            });
            setDataSort(data1);
            break;
          } else if (item.name === "opinions") {
            const blog4 = posts.filter((d) => {
              return d?.category.toLowerCase() === "opinions";
            });
            const data1 = blog4.sort((a, b) => {
              if (b.createdAt > a.createdAt) return 1;
              if (b.createdAt < a.createdAt) return -1;
              return 0;
            });
            setDataSort(data1);
            break;
          } else if (item.name === "all") {
            const data1 = posts.sort((a, b) => {
              if (b.createdAt > a.createdAt) return 1;
              if (b.createdAt < a.createdAt) return -1;
              return 0;
            });
            setDataSort(data1);
            break;
          }

        case "TOOLS":
          setDataSort(posts);
        // if (item.name === "ai") {
        //   const blog4 = posts.filter((d) => {
        //     return d?.subCategory?.toLowerCase() === "ai";
        //   });
        //   const data1 = blog4.sort((a, b) => {
        //     if (b.createdAt > a.createdAt) return 1;
        //     if (b.createdAt < a.createdAt) return -1;
        //     return 0;
        //   });
        //   setDataSort(data1);
        //   break;
        // }

        default:
          const data1 = posts.sort((a, b) => {
            if (b.createdAt > a.createdAt) return 1;
            if (b.createdAt < a.createdAt) return -1;
            return 0;
          });
          setDataSort(data1);
          break;
      }
    };
    postsData();
  }, [posts, category, subCategoryNews, item?.name]);

  const handleClick = (e, index) => {
    setItem({ name: e.target.textContent.toLowerCase() });
    setActive(index);
  };

  console.log("count",dataSort)

  return (
    <Format>
      <div className="flex flex-col overflow-hidden relative z-50">
        <div
          id="cover"
          className="cover-strip h-screen w-3/12 bg-slate-50  top-0 left-0 cover fixed"
        ></div>
        <div
          id="cover1"
          className="cover-strip h-screen w-3/12 bg-slate-100 fixed top-0 left-1/4 cover"
        ></div>
        <div
          id="cover2"
          className="cover-strip h-screen w-3/12 bg-slate-200 fixed top-0 left-2/4 cover"
        ></div>
        <div
          id="cover3"
          className="cover-strip h-screen w-3/12 bg-slate-300 fixed top-0 left-3/4 cover"
        ></div>
      </div>
      <section className="section section__cat mx-auto md:px-2 py-8 w-3/4">
        <div className="container post py-10 flex flex-row justify-begin mt-20 ">
          <div className="image pr-10 flex justify-center ">
            <Image
              src={category?.image}
              alt=""
              width={120}
              height={80}
              className="category__img"
            />
          </div>
          <h1 className=" font-bold flex flex-col justify-center text-4xl text-center pb-5 ">
            {category?.name == "NEWS"
              ? "TECHIE'S SOCIETY"
              :category?.name == "TOOLS"
              ? "TOOLS TO"
              : category?.name}
          </h1>
        </div>
        <div className="flex justify-center pb-8 mt-10 mb-20 section1__posts">
          <h1 className="font-bold text-4xl py-8 text-center section1__posts-title">
            Latest Posts
          </h1>
        </div>
        {category?.name == "NEWS" ? (
          <div className="work__filters">
            {subCategoryNews.map((item, index) => {
              return (
                <span
                  onClick={(e) => {
                    handleClick(e, index);
                  }}
                  className={`${
                    active === index ? "active-work" : ""
                  } work__item`}
                  key={index}
                >
                  {item?.name}
                </span>
              );
            })}
          </div>
        ) : category?.name == "USEFULHACKS" ? (
          <div className="work__filters">
            <ul className="nav__list2 grid">
              {subCategoryHacks.map((item, index) => {
                return (
                  <span
                    onClick={(e) => {
                      handleClick(e, index);
                    }}
                    className={`${
                      active === index ? "active-work" : ""
                    } work__item2`}
                    key={index}
                  >
                    {item?.name}
                  </span>
                );
              })}
            </ul>
          </div>
        ) : category?.name == "PROJECTS" ? (
          <div className="work__filters">
            {subCategoryProject.map((item, index) => {
              return (
                <span
                  onClick={(e) => {
                    handleClick(e, index);
                  }}
                  className={`${
                    active === index ? "active-work" : ""
                  } work__item`}
                  key={index}
                >
                  {item?.name}
                </span>
              );
            })}
          </div>
        ) : category?.name == "TOOLS" ? (
          <div className="work__filters">
            {subCategoryTools.map((item, index) => {
              return (
                <span
                  onClick={(e) => {
                    handleClick(e, index);
                  }}
                  className={`${
                    active === index ? "active-work" : ""
                  } work__item`}
                  key={index}
                >
                  {item?.name}
                </span>
              );
            })}
          </div>
        ) : (
          <></>
        )}
        <div className="category__spacer"></div>
        {/* grid columns */}
       { category?.name == "TOOLS" ?
       (
        <div className="posts">
        {dataSort.map((post,index) => (
          <PostVal post={post} key={post.id} />
        ))}
      </div>
       )
       :(<>
        {posts ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
            {dataSort &&
              dataSort
                .slice(0, 9)
                .map((post, index) => <Post3col post={post} key={post.id} />)}
          </div>
        ) :
         (
          <div className="flex flex-col justify-center item-center">
            {" "}
            <Error />
          </div>
        )}
        </>)}

        {posts.length>9 ? (
          <>
         <div className="flex justify-center pb-8 mt-10 mb-20 section1__posts">
          <h1 className="font-bold text-4xl py-8 text-center section1__posts-title">
            Posts
          </h1>
        </div>
        
          <div className=" posts__Col__older">
            {pageData &&
              pageData.map((post, index) => (
                <PostCol2 post={post} key={post.id} />
              ))}
          </div>
          </>
        
        ) : (
          <div className="flex flex-col justify-center item-center">
            {" "}
          </div>
        )}

       <div className="flex justify-center items-center">
          <Pagination page={page} perPage={perPage} itemCount={itemCount?.length} />
        </div>
      </section>
    </Format>
  );
}
