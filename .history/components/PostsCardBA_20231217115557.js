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
    <main>
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
        
          <div class="card-content">
            <h2> {post?.title}</h2>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              exercitationem iste, voluptatum, quia explicabo laboriosam rem
              adipisci voluptates cumque, veritatis atque nostrum corrupti ipsa
              asperiores harum? Dicta odio aut hic.
            </p>
            <a href="#" class="button">
              Find out more
              <span class="material-symbols-outlined">arrow_right_alt</span>
            </a>
          
        </div>
      </div>
    </main>
  );
};

export default PostsCardBA;
