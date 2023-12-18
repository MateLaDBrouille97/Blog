import Link from "next/link";
import Image from "next/image";
import Author3BA from "./_child/Author3BA";
import AuthorBA from "./_child/AuthorBA";
import React, { useEffect, useState, useMemo } from "react";


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
      <div className="card-content">
      <Link href={`/Categories/${post?.category?.name=="OPINIONS"||post?.category?.name=="ANALYSIS"||post?.category?.name=="GEOPOL"?"NEWS":post?.category?.name}`} legacyBehavior>
            <a className="text-orange-600 hover:text-orange-800">
              {post?.category?.name || "UnKnown"}
            </a>
          </Link>
        <p>
          <Link href={`/BlogArticles/${post?.id}`} legacyBehavior>
            <a className=" postCol__title3 text-3xl font-bold text-gray-800 hover:text-gray-600  ">
              {post?.title}
            </a>
          </Link>
        </p>
        <div className="postCol-author2">
          {user ? <AuthorBA author={user} /> : <></>}
        </div>
        <a href="#" className="button">
          Find out more
          <span class="material-symbols-outlined">arrow_right_alt</span>
        </a>
      </div>
    </div>
  );
};

export default PostsCardBA;
