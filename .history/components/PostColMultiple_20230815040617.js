import React, { useEffect, useState } from 'react';
import PostP7 from './PostP7';
import PostCol3 from './PostCol3';


export default function PostColMultiple({posts}) {
  const [allposts,setAllPosts]=useState([]);

  useEffect(()=>{
    setAllPosts(posts)
  },[posts])


  console.log(allposts)

  return (
    <div>
        (<div className='container2 grid'>
            <PostP7 post={allposts[0]} key={allposts?.[0]?.id}/>
            <div className="">
                <div className="flex flex-col gap-1">
                  {/* Post */}
                  {allposts&&allposts ? (
                    allposts.slice(1,3).map((post, index) => (
                        <PostCol3 post={post} key={post.id} />
                      ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>
        </div>)
    </div>
  )
}
