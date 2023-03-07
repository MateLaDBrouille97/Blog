import React from 'react';
import Image from 'next/image';
import img from "../public/images/Broken.jpg"

export default function Error() {
  return (
    <div className="text-center py-10">
        <h1 className="text-3xl font-bold text-orange-600 py-10">
          Something went wrong 
        </h1>
        <Image src="" alt='' width={50} height={50}/>
    </div>
  )
}
