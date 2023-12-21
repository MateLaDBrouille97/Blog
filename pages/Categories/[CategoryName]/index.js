import Format from "../../../layout/Format";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { categoriesName } from "../../../public/blogDataName";
import { useRouter } from "next/router";
import { useBlogContext } from "../../../contexts/BlogContext";
import Error from "../../../components/_child/Error";
import Post3col from "../../../components/Post3Col";
import { gsap } from "gsap";
import {
  subCategoryNews,
  subCategoryHacks,
  subCategoryProject,
  subCategoryTools,
} from "../../../public/subCategoryName";
import Spinner from "../../../components/_child/Spinner";
import PostCol2 from "../../../components/PostCol2";
import Pagination from "../../../components/Pagination";
import PostVal from "../../../components/PostVal";
import Post3colBA from "../../../components/Post3ColBA";
import PostCol2BA from "../../../components/PostCol2BA";
import { API_URL } from "../../../config/index";
import PostsCardBA from "../../../components/PostsCardBA";
import PostsCard from "../../../components/PostsCard";

export async function getServerSideProps() {
  const response = await fetch(`${API_URL}/api/getBlogArticles`);
  if (!response.ok) {
    throw new Error("Failed to fetch data in category");
  }
  const blogArt = await response.json();
  return { props: { blogArt } }
}

export default function CategoryName({blogArt}) {
  const router = useRouter();
  const categoryName = router?.query?.CategoryName;
  // const { categoriesName } = blogData;
  const { blogUFH, blogP, blogN, data, blogO, tools, blogA, blogG } =
    useBlogContext();
  const [cat, setCat] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchDataSorted = async () => {
      // const blogArt = await getBlogArticles();
      // const blogArt = await getCategories()
      setBlogArticle(blogArt);
    };
    fetchDataSorted();
  }, [blogArt]);

  //--------------------------------------------------------------------------------------------

  const [blogArticle, setBlogArticle] = useState([]);
  const [postsUfh, setPostsUFH] = useState([]);
  const [postsProj, setPostsProj] = useState([]);
  const [postsNews, setPostsNews] = useState([]);
  const [postsTools, setPostsTools] = useState([]);
  const [postsfiltered, setFiltered] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const filteredArticles1 = blogArticle.filter((article) => {
          return article?.category?.name === "USEFULHACKS";
        });
        setPostsUFH(filteredArticles1);

        const filteredArticles2 = blogArticle.filter((article) => {
          return article?.category?.name === "PROJECTS";
        });
        setPostsProj(filteredArticles2);

        const filteredArticles3 = blogArticle.filter((article) => {
          return (
            (article?.category?.name === "NEWS") |
            (article?.category?.name === "ANALYSIS") |
            (article?.category?.name === "OPINIONS") |
            (article?.category?.name === "GEOPOL")
          );
        });
        setPostsNews(filteredArticles3);

        const filteredArticles4 = blogArticle.filter((article) => {
          return article?.category?.name === "TOOLS";
        });
        setPostsTools(filteredArticles4);

        const filteredData = blogArticle.filter((item) => {
          return item?.title
            ?.toLowerCase()
            .includes(categoryName?.toLowerCase());
        });
        setFiltered(filteredData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state if necessary
      }
    };

    fetchData();
  }, [blogArticle, categoryName, router]);

  //---------------------------------------------------------------------------------------------

  useEffect(() => {
    const postsD = () => {
      if (!router.isReady) return;
      const filt = categoriesName?.filter(
        (value) => value?.name == categoryName
      );
      setCat(filt?.[0]);
      try {
        switch (categoryName) {
          case "USEFULHACKS":
            const postsUFH = [...postsUfh, ...blogUFH];
            setPosts(postsUFH);
            break;
          case "PROJECTS":
            const postsP = [...postsProj, ...blogP];
            setPosts(postsP);
            break;
          case "NEWS":
            const blogmerge = [
              ...postsNews,
              ...blogN,
              ...blogO,
              ...blogA,
              ...blogG,
            ];
            setPosts(blogmerge);
            break;
          case "POSTS":
            const postsData = [...blogArticle, ...data];
            setPosts(postsData);
            break;
          case "TOOLS":
            const postsT = [...postsTools, ...tools];
            setPosts(postsT);

            break;
          default:
            // If categoryName doesn't match any of the above cases,
            // filter the data based on the title
            const filteredData = data.filter((item) =>
              item?.title?.toLowerCase().includes(categoryName?.toLowerCase())
            );
            const filtered = [...postsfiltered, ...filteredData];
            setPosts(filtered);
            break;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state if necessary
      }
    };
    postsD();
  }, [
    router.query.CategoryName,
    router.isReady,
    data,
    categoryName,
    postsUfh,
    blogUFH,
    postsProj,
    blogP,
    postsNews,
    blogN,
    blogO,
    blogA,
    blogG,
    blogArticle,
    postsTools,
    tools,
    postsfiltered,
  ]);

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
  const [active, setActive] = useState(0);
  const [item, setItem] = useState({ name: "All" });

  //Sort from newest to oldest

  const [dataSort, setDataSort] = useState([]);

  //---------------------Pagination-----------------------------

  const query = router.query;
  const page = query.page ?? "1";
  const perPage = query.perPage ?? "12";

  // Lines 27-29: Define limit and skip which is used by DummyJSON API for pagination
  const limit = perPage;
  const skip = (parseInt(page) - 1) * parseInt(limit);
  const endIndex = skip + parseInt(limit);
  const itemCount = dataSort?.slice(9);
  const pageData = itemCount?.slice(skip, endIndex);

  //------------------------------------------------------------------------------------

  //------------------------------------------------------------------------------------
  useMemo(() => {
    const postsData = () => {
      try {
        switch (category?.name) {
          case "USEFULHACKS":
            if (item.name === "productivity") {
              const blog3 = posts.filter((d) => {
                if (d.isPublished) {
                  return d?.subcategory?.name?.toLowerCase() === "productivity";
                } else {
                  return d?.subCategory?.toLowerCase() === "productivity";
                }
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
                if (d.isPublished) {
                  return d?.subcategory?.name?.toLowerCase() === "assistants";
                } else {
                  return d?.subCategory?.toLowerCase() === "assistants";
                }
              });
              const data1 = blog4.sort((a, b) => {
                if (b.createdAt > a.createdAt) return 1;
                if (b.createdAt < a.createdAt) return -1;
                return 0;
              });
              setDataSort(data1);
              break;
            } else if (item.name === "all") {
              const blog4 = posts.filter((d) => {
                if (d.isPublished) {
                  return d?.category?.name === "USEFULHACKS";
                } else {
                  return d?.category === "USEFULHACKS";
                }
              });

              const data1 = blog4.sort((a, b) => {
                if (b.createdAt > a.createdAt) return 1;
                if (b.createdAt < a.createdAt) return -1;
                return 0;
              });
              setDataSort(data1);
              break;
            } else if (item.name === "research tools") {
              const blog4 = posts.filter((d) => {
                if (d.isPublished) {
                  return (
                    d?.subcategory?.name?.toLowerCase() === "research_tools"
                  );
                } else {
                  return d?.subCategory?.toLowerCase() === "research_tools";
                }
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
                if (d.isPublished) {
                  return d?.subcategory?.name?.toLowerCase() === "copywriting";
                } else {
                  return d?.subCategory?.toLowerCase() === "copywriting";
                }
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
                if (d.isPublished) {
                  return d?.subcategory?.name?.toLowerCase() === "marketing";
                } else {
                  return d?.subCategory?.toLowerCase() === "marketing";
                }
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
                if (d.isPublished) {
                  return d?.subcategory?.name?.toLowerCase() === "other";
                } else {
                  return d?.subCategory?.toLowerCase() === "other";
                }
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
                if (d.isPublished) {
                  return d?.subcategory?.name?.toLowerCase() === "image_video";
                } else {
                  return d?.subCategory?.toLowerCase() === "image_video";
                }
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
                if (d.isPublished) {
                  return d?.subcategory?.name?.toLowerCase() === "app";
                } else {
                  return d?.subCategory?.toLowerCase() === "app";
                }
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
                if (d.isPublished) {
                  return d?.subcategory?.name?.toLowerCase() === "web";
                } else {
                  return d?.subCategory?.toLowerCase() === "web";
                }
              });
              const data1 = blog4.sort((a, b) => {
                if (b.createdAt > a.createdAt) return 1;
                if (b.createdAt < a.createdAt) return -1;
                return 0;
              });
              setDataSort(data1);
              break;
            } else if (item.name === "all") {
              const blog4 = posts.filter((d) => {
                if (d.isPublished) {
                  return d?.category?.name === "PROJECTS";
                } else {
                  return d?.category === "PROJECTS";
                }
              });

              const data1 = blog4.sort((a, b) => {
                if (b.createdAt > a.createdAt) return 1;
                if (b.createdAt < a.createdAt) return -1;
                return 0;
              });
              setDataSort(data1);
              break;
            } else if (item.name === "analyze") {
              const blog4 = posts.filter((d) => {
                if (d.isPublished) {
                  return d?.subcategory?.name?.toLowerCase() === "analyze";
                } else {
                  return d?.subCategory?.toLowerCase() === "analyze";
                }
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
                if (d.isPublished) {
                  return d?.subcategory?.name?.toLowerCase() === "ai";
                } else {
                  return d?.subCategory?.toLowerCase() === "ai";
                }
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
                if (d.isPublished) {
                  return d?.category?.name?.toLowerCase() === "news";
                } else {
                  return d?.category?.toLowerCase() === "news";
                }
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
                if (d.isPublished) {
                  return d?.category?.name?.toLowerCase() === "opinions";
                } else {
                  return d?.category?.toLowerCase() === "opinions";
                }
              });
              const data1 = blog4.sort((a, b) => {
                if (b.createdAt > a.createdAt) return 1;
                if (b.createdAt < a.createdAt) return -1;
                return 0;
              });
              setDataSort(data1);
              break;
            } else if (item.name === "analysis") {
              const blog4 = posts.filter((d) => {
                if (d.isPublished) {
                  return d?.category?.name?.toLowerCase() === "analysis";
                } else {
                  return d?.category?.toLowerCase() === "analysis";
                }
              });
              const data1 = blog4.sort((a, b) => {
                if (b.createdAt > a.createdAt) return 1;
                if (b.createdAt < a.createdAt) return -1;
                return 0;
              });
              setDataSort(data1);
              break;
            } else if (item.name === "geopol") {
              const blog4 = posts.filter((d) => {
                if (d.isPublished) {
                  return d?.category?.name?.toLowerCase() === "geopol";
                } else {
                  return d?.category?.toLowerCase() === "geopol";
                }
              });
              const data1 = blog4.sort((a, b) => {
                if (b.createdAt > a.createdAt) return 1;
                if (b.createdAt < a.createdAt) return -1;
                return 0;
              });
              setDataSort(data1);
              break;
            } else if (item.name === "all") {
              const blog4 = posts.filter((d) => {
                if (d.isPublished) {
                  return (
                    d?.category?.name === "NEWS" ||
                    d?.category?.name === "ANALYSIS" ||
                    d?.category?.name === "OPINIONS" ||
                    d?.category?.name === "GEOPOL"
                  );
                } else {
                  return (
                    d?.category === "NEWS" ||
                    d?.category?.name === "ANALYSIS" ||
                    d?.category?.name === "OPINIONS" ||
                    d?.category?.name === "GEOPOL"
                  );
                }
              });
              const dataNews = blog4.sort((a, b) => {
                if (b.createdAt > a.createdAt) return 1;
                if (b.createdAt < a.createdAt) return -1;
                return 0;
              });
              setDataSort(dataNews);
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
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state if necessary
      }
    };
    postsData();
  }, [category?.name, item.name, posts]);

  const handleClick = (e, index) => {
    setItem({ name: e.target.textContent.toLowerCase() });
    setActive(index);
  };

  const backgroundImageStyle = {
    backgroundImage: `url(${category?.image})`,
  };

  return (
    <Format>
      <section className="section section4 mx-auto md:px-20 py-16 lg:w-4/6 md:w-5.25/6">
        <div className="section__cat container-section4">
          <div className="post__article-blog3" style={backgroundImageStyle} />
          <div className="  py-10 flex flex-row justify-center mt-20 content">
            
            <h1
              className={`font-bold flex flex-col justify-center text-4xl text-center pb-5 category__news ${
                category?.name === "TOOLS" ? "text-white" : ""
              }`}
            >
              {category?.name == "NEWS"
                ? "TECHIE'S SOCIETY"
                : category?.name == "TOOLS"
                ? "TOOLS TO"
                : category?.name}
            </h1>
            <span className="m-4"></span>
            <div className="image pr-10 flex justify-center ">
            
              
              {!category?.image ? (
                <Spinner />
              ) : (
                <Image
                src={category?.image}
                alt=""
                width={60}
                height={60}
                className="category__img "
              />
              )}
            
            </div>
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
          {category?.name == "TOOLS" ? (
            <div className="posts">
              {dataSort.map((post, index) => (
                <PostVal post={post} key={post.id} />
              ))}
            </div>
          ) : (
            <>
              {dataSort ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14 mb-10 p-10">
                  
                  {dataSort &&
                    dataSort
                      .slice(0, 9)
                      .map((post, index) => (
                        <React.Fragment key={post.id}>
                          {post.isPublished ? (
                            <PostsCardBA post={post} key={post.id} />
                          ) : (
                            <PostsCard post={post} key={post.id} />
                          )}
                        </React.Fragment>
                      ))}
                </div>
              ) : (
                <div className="flex flex-col justify-center item-center">
                  {" "}
                  <Error />
                </div>
              )}
            </>
          )}

          {dataSort.length > 9 ? (
            <>
              <div className="flex justify-center pb-8 mt-10 mb-20 section1__posts">
                <h1 className="font-bold text-4xl py-8 text-center section1__posts-title">
                  Posts
                </h1>
              </div>

              <div className=" posts__Col__older">
                {pageData &&
                  pageData.map((post, index) =>
                    post.isPublished ? (
                      <PostCol2BA post={post} key={post.id} />
                    ) : (
                      <PostCol2 post={post} key={post.id} />
                    )
                  )}
              </div>
            </>
          ) : (
            <div className="flex flex-col justify-center item-center"> </div>
          )}

          <div className="flex justify-center items-center">
            <Pagination
              page={page}
              perPage={parseInt(limit)}
              itemCount={itemCount?.length}
            />
          </div>
        </div>
      </section>
    </Format>
  );
}


