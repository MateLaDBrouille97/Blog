import React, { useEffect, useState } from "react";
import PostP7 from "./PostP7";
import PostCol3 from "./PostCol3";
import PostCol32 from "./PostCol32";
import PostP8 from "./PostP8";

export default function PostColMultiple({ posts }) {
  const [allposts, setAllPosts] = useState([]);

  useEffect(() => {
    setAllPosts(posts);
  }, [posts]);

  return (
    <div className="section4__posts">
      <div className="container2 grid">
        <div className="box-1">
          <PostP7 post={allposts[0]} key={allposts?.[0]?.id} />
        </div>
        <div className="box-2">
          <div className="section4__posts">
            <div className="flex flex-col gap-1">
              {/* Post */}
              {allposts && allposts ? (
                allposts
                  .slice(1, 3)
                  .map((post, index) => <PostP8 post={post} key={post.id} />)
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container3 grid">
        <div className="section4__posts">
          <div className="flex flex-col gap-1">
            {/* Post */}
            {dataSort ? (
              dataSort
                .slice(4, 6)
                .map((post, index) => <PostCol3 post={post} key={post.id} />)
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="section4__posts">
          <div className="flex flex-col gap-1">
            {/* Post */}
            {dataSort ? (
              dataSort
                .slice(7, 9)
                .map((post, index) => <PostCol3 post={post} key={post.id} />)
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
