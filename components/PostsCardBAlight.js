import Link from "next/link";
import Image from "next/image";
import Author3BA from "./_child/Author3BA";
import AuthorBA from "./_child/AuthorBA";
import React, { useEffect, useState, useMemo } from "react";
import { ArrowRight } from "lucide-react";

const PostsCardBAlight = ({ post, index }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      setUser(post?.author);
    };
    fetchUser();
  }, [post]);

  return (
    <main2 className="flex justify-center items-start">
      <div className="card">
        {post?.imageUrl && (
          <Image
            src={post?.imageUrl}
            height={900}
            width={900}
            alt="blog image"
            className="rounded-sm"
          />
        )}
        <div className="card-content ">
          <h3>
            <a
              href={`/Categories/${
                post?.category?.name == "OPINIONS" ||
                post?.category?.name == "ANALYSIS" ||
                post?.category?.name == "GEOPOL"
                  ? "NEWS"
                  : post?.category?.name
              }`}
              className="text-orange-900 hover:text-orange-800 color-top"
            >
              {post?.category?.name || "UnKnown"}
            </a>
          </h3>

          <h2>
            {post?.title?.substring(0, 29) +
              (post?.title?.length > 29 ? "..." : "")}
          </h2>

          <a 
          href={`/BlogArticles/${post?.id}`}
           className="find-out-more">
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

export default PostsCardBAlight;
