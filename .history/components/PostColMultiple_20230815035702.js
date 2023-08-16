import React, { useEffect, useState } from 'react';


export default function PostColMultiple({posts}) {
  const [allposts,setAllPosts]=useState([]);

  useEffect(()=>{
    setAllPosts(posts)
  },[posts])


  console.log(allposts)

  return (
    <div>PostColMultiple</div>
  )
}
