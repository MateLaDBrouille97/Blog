import React from "react";
import PostP7 from "./PostP7";

export default function PostColMultiple2() {
  return (
    <div className="section5__posts">
        <div className="main_postColMultiple">
            <div className="top">
                <div className="topLeft">
                <PostP7 post={allposts[0]} key={allposts?.[0]?.id} />
                </div>
                <div className="topRight"></div>
            </div>
            <div className="bottom"></div>
        </div>
      
    </div>
  );
}