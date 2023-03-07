import React from 'react';

export default function Newsletter() {
  return (
    <section className="bg-gray-50 mt-20">
        <div className="container mx-auto md:px-20 py-16 text-center">
          <h1 className="font-bold text-3xl">Subscribe to Newsletter</h1>
          <div className="py-4">
            <input type="text" className="shadow border rounded w-9/12 py-3 px-3 text-gray-700 focus:outline-none focus:shadow-outline"/>

          </div>
        </div>
    </section>
  )
}
