import Link from "next/link";
import Image from "next/image";
import Author3BA from "./_child/Author3BA";
import AuthorBA from "./_child/AuthorBA";
import React, { useEffect, useState, useMemo } from "react";
import { ArrowRight } from "lucide-react";

const PostsCardBA = ({ post, index }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      setUser(post?.author);
    };
    fetchUser();
  }, [post]);

  const formatDate = (createdAt) => {
    const options = { day: "numeric", month: "numeric", year: "numeric" };
    return new Date(createdAt).toLocaleDateString(undefined, options);
  };

  return (
    <main2 className="flex justify-center items-start">
      <div className="card">
        {post?.imageUrl && (
          <Image
            src={post?.imageUrl}
            height={900}
            width={900}
            alt="blog image"
            className="rounded-sm hover:blur-lg"
          />
        )}
        <div className="card-content ">
          <h3>
            <Link
              href={`/Categories/${
                post?.category?.name == "OPINIONS" ||
                post?.category?.name == "ANALYSIS" ||
                post?.category?.name == "GEOPOL"
                  ? "NEWS"
                  : post?.category?.name
              }`}
              legacyBehavior
            >
              <a className="text-orange-900 hover:text-orange-800 color-top">
                {post?.category?.name || "UnKnown"}
              </a>
            </Link>
          </h3>

          <h2>
            {post?.title?.substring(0, 29) +
              (post?.title?.length > 29 ? "..." : "")}
          </h2>

          <Link href={`/BlogArticles/${post?.id}`} legacyBehavior>
            <p className="description-element">
              <p2 style={{margin:"0 0 10px 0px"}}>
                by {post?.author?.firstName} <span style={{margin:"0 10px 0 0"}}></span>
                {post?.createdAt ? `${formatDate(post?.createdAt)}` : "UnKnown"}
              </p2>
              {post?.description?.substring(0, 150) +
                (post?.description?.length > 150 ? "..." : "")}
            </p>
          </Link>

          <a href={`/BlogArticles/${post?.id}`} className="find-out-more">
            Find out more{"   "}
            <span>
              <ArrowRight className="material-symbols-outlined " />
            </span>
          </a>
        </div>
      </div>
    </main2>
  );
};

export default PostsCardBA;
