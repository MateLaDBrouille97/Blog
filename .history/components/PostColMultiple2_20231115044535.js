import React, { useEffect, useState } from "react";
import PostP7 from "./PostP7";
import PostP7BA from "./PostP7BA";
import PostP8 from "./PostP8";
import PostP8BA from "./PostP8BA";
import PostCol32 from "./PostCol32";
import PostCol32BA from "./PostCol32BA";

export default function PostColMultiple2({ posts }) {
  const [allposts, setAllPosts] = useState([]);

  console.log(allposts)

  useEffect(() => {
    try {
      setAllPosts(posts);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error state if necessary
    }
  }, [posts]);

  return (
    <div className="section5__posts">
      <div className="main_postColMultiple">
        <div className="top">
          <div className="topLeft">
            <div className="topLeft__container">
              {allposts[0]?.isPublished ? (
                <PostP7BA post={allposts[0]} key={allposts?.[0]?.id} />
              ) : (
                <PostP7 post={allposts[0]} key={allposts?.[0]?.id} />
              )}
            </div>
          </div>
          <div className="topRight">
            <div className="topRight__container ">
              {allposts && allposts ? (
                allposts.slice(1, 3).map((post, index) => 
                  post?.isPublished ? (
                    <PostP8BA post={post} key={post.id} />
                  ) : (
                    <PostP8 post={post} key={post.id} />
                  )
                )
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className="bottom">
          <div className="bottom__container">
            <div className="bottom-left">
              <div className="container__b-left">
                {allposts ? (
                  allposts.slice(3, 5).map((post, index) => 
                    post?.isPublished ? (
                      <PostCol32BA post={post} key={post.id} />
                    ) : (
                      <PostCol32 post={post} key={post.id} />
                    )
                  )
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="bottom-right">
              <div className="container__b-left">
                {allposts ? (
                  allposts.slice(5, 7).map((post, index) => 
                    post?.isPublished ? (
                      <PostCol32BA post={post} key={post.id} />
                    ) : (
                      <PostCol32 post={post} key={post.id} />
                    )
                  )
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
