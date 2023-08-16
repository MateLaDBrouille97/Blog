import React, { useEffect, useState } from 'react';
import PostP7 from './PostP7';


export default function PostColMultiple({posts}) {
  const [allposts,setAllPosts]=useState([]);

  useEffect(()=>{
    setAllPosts(posts)
  },[posts])


  console.log(allposts)

  return (
    <div>
        <div className='container2 grid'>
            <PostP7 post={allpost[0]} key={allpost?.[0]?.id}/>
        </div>
    </div>
  )
}
