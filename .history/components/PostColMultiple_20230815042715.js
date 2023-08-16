import React, { useEffect, useState } from 'react';
import PostP7 from './PostP7';
import PostCol3 from './PostCol3';
import PostCol32 from './PostCol32';


export default function PostColMultiple({posts}) {
  const [allposts,setAllPosts]=useState([]);

  useEffect(()=>{
    setAllPosts(posts)
  },[posts])


  console.log(allposts)

  return (
    <div>
  <div className='container2 grid'>
    <div className="box-1">
      <PostP7 post={allposts[0]} key={allposts?.[0]?.id} />
    </div>
    <div className="box-2">
      <div className="section4__posts">
        <div className="flex flex-col gap-1">
          {/* Post */}
          {allposts && allposts ? (
            allposts.slice(1, 4).map((post, index) => (
              <PostCol32 post={post} key={post.id} />
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  </div>
</div>

  )
}
