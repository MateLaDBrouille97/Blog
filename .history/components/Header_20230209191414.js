import React from 'react';

export default function Header() {
  return (
    <header className='bg-gray-50'>
     <div className="xl:container xl:mx-auto">
        <div>
            <input type="text">
            </input>
        </div>
        <div>
            <a>Design</a>
        </div>
        <div>
            <div className='flex'>
                <a>Facebook</a>
                <a>Twitter</a>
                <a>Youtube</a>
            </div>
        </div>
     </div>
    </header>
  )
}
