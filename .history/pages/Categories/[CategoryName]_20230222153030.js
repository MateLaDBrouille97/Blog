import Author from "@/components/_child/Author";
import Related from "@/components/_child/Related";
import Format from "@/layout/Format";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import blogData from "../api/blogDataName";
import { useRouter } from "next/router";
import { useBlogContext } from "@/contexts/BlogContext";
import Link from "next/link";
import Error from "@/components/_child/Error";
import { useUserContext } from "@/contexts/UserContext";
import { DataStore } from "aws-amplify";
import { User } from "@/src/models";

export default function CategoryName() {
  const router = useRouter();
  const categoryName = router?.query?.CategoryName;
  const { categoriesName } = blogData;
  const { blogUFH, blogP, blogN, data } = useBlogContext();
  const [cat, setCat] = useState("");
  const [posts, setPosts] = useState([]);
  const { dbUser } = useUserContext();

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
          setPosts(blogN);
          break;
      }
    };
    postsD();
  }, [router.query.CategoryName, router.isReady]);

  return (
    <>
      <div>
        {cat && <Category category={cat} posts={posts} key={cat?.id} />}
      </div>
    </>
  );
}

function Category({ category, posts }) {
  return (
    <Format>
      <section className="container mx-auto md:px-2 py-16 w-1/2">
        <div className=" post py-10 flex flex-row justify-begin ">
          <div className="image pr-10 flex justify-center">
            <Image
              src={category?.image}
              alt=""
              width={120}
              height={80}
              className="category__img"
            />
          </div>
          <h1 className=" font-bold flex flex-col justify-center text-4xl text-center pb-5 ">
            {category?.name}
          </h1>
        </div>
        <h1 className="font-bold text-4xl py-12 text-center">Latest Posts</h1>
        {/* grid columns */}
        {posts ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14">
            {posts &&
              posts.map((post, index) => <Post post={post} key={post.id} />)}
          </div>
        ) : (
          <div className="flex flex-col justify-center item-center">
            {" "}
            <Error />
          </div>
        )}
      </section>
    </Format>
  );
}

function Post({ post }) {


  const { dbUser } = useUserContext();
  const [date, setDate] = useState("");
  const [user,setUser] =useState("");

  useEffect(() => {
    const convertAwsDateToDate = (awsDate) => {
      const year = awsDate.substring(0, 4);
      const month = awsDate.substring(5, 7) - 1; // Subtract 1 since months are zero-indexed
      const day = awsDate.substring(8, 10);
      const newDate = new Date(year, month, day).toLocaleDateString();
      setDate(newDate);
    };
    convertAwsDateToDate(post?.createdAt);
  }, [post]);

  useEffect(()=>{
    const fetchUser = async()=>{
      await DataStore.query(User,(user)=>user.id.eq(post?.userID)).then(user=>setUser(user));
      
    }
    fetchUser();
  },[])

  console.log(user);


  return (
    <div className="item">
      <div className="images">
        <Link href={`/Posts/${post?.id}`} legacyBehavior>
          <a>
            <Image
              src={post?.img || "/"}
              alt=""
              width={500}
              height={350}
              className="rounded"
            />
          </a>
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4">
        <div className="cat flex gap-6">
          <Link href="/" legacyBehavior>
            <a className="text-orange-600 hover:text-orange-800">
              {post?.category || "UnKnown"}
            </a>
          </Link>
          <Link href="/" legacyBehavior>
            <a className="text-gray-600 hover:text-gray-800">
              {date || "UnKnown"}
            </a>
          </Link>
        </div>
        <div className="title">
          <Link href={`/Posts/${post?.id}`} legacyBehavior>
            <a className="text-xl font-bold text-gray-800 hover:text-gray-600">
              {post?.title}
            </a>
          </Link>
        </div>
        <p className="text-gray-500 py-3">{post?.description}</p>
        {user ? <Author author={user} /> : <></>}
      </div>
    </div>
  );
}
