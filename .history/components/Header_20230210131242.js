import React from 'react';
import { ImFacebook,ImTwitter,ImYoutube } from "react-icons/im";

export default function Header() {
  return (
    <header className='bg-gray-50'>
     <div className="xl:container xl:mx-auto flex flex-col items-center sm:flex-row sm:justify-between text-center py-3">
        <div className='md:flex-none w-96 order-2 sm:order-1 flex justify-center py-4 sm:py-0'>
            <input type="text" className='input-text' placeholder='Search...'>
            </input>
        </div>
        <div className='shrink w-80 sm:order-2'>
            <a>Design</a>
        </div>
        <div className='w-96 order-3 flex justify-center'>
            <div className='flex gap-6'>
                <a><ImFacebook/></a>
                <a><ImTwitter/></a>
                <a><ImYoutube/></a>
            </div>
        </div>
     </div>
    </header>
  )
}
