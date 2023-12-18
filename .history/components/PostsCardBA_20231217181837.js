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
            className="rounded-sm"
          />
        )}
        <div className="card-content ">
          <h2>{post?.title}</h2>

          <Link href={`/Posts/${post?.slug}`} legacyBehavior>
            <p className="">
              {post?.description?.substring(0, 150) +
                (post?.description?.length > 150 ? "..." : "")}
            </p>
          </Link>

          <Link href={`/Posts/${post?.slug}`} legacyBehavior>
            <a href="#" className="find-out-more">
              Find out more{" "}
              <span>
                <ArrowRight className="material-symbols-outlined" />
              </span>
            </a>
          </Link>
        </div>
      </div>
    </main2>
  );
};

export default PostsCardBA;
