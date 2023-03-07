import React from 'react'

export default function Section4() {
  return (
    <section className="container mx-auto md:px-20 py-16">
        <div className="grid lg:grid-cols-2">
            <div className='item'> 
            <h1 className="font-bold text-4xl py-12 text-center">Projects</h1>
            <div className='flex flex-col gap-6'>
                {/* Post */}
            </div>
            </div>
            <div className='item'> 
            </div>
        </div>
    </section>
  )
}


function Post(){
    return (
        <div className="flex gap-5">
           <div className="image"></div>
        </div>
    )
}