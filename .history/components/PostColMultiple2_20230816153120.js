import React, { useEffect, useState } from "react";
import PostP7 from "./PostP7";
import PostP8 from "./PostP8";
import PostCol32 from "./PostCol32";

export default function PostColMultiple2({ posts }) {
  const [allposts, setAllPosts] = useState([]);

  useEffect(() => {
    setAllPosts(posts);
  }, [posts]);

  return (
    <div className="section5__posts">
      <div className="main_postColMultiple">
        <div className="top">
          <div className="topLeft">
            <div className="topLeft__container">
              <PostP7 post={allposts[0]} key={allposts?.[0]?.id} />
            </div>
          </div>
          <div className="topRight">
            <div className="topRight__container">
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
        <div className="bottom">
          <div className="bottom__container">
            <div className="bottom-left">
              {allposts ? (
                allposts
                  .slice(4, 6)
                  .map((post, index) => <PostCol32 post={post} key={post.id} />)
              ) : (
                <></>
              )}
            </div>
            <div className="bottom-right">
              {allposts ? (
                allposts
                  .slice(7, 9)
                  .map((post, index) => <PostCol32 post={post} key={post.id} />)
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
