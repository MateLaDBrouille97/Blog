"use client";
import React from 'react';

import BlogMobileSidebar from "./blog-mobile-sidebar2";



export default function BlogArticleNavbar ({ blogarticle,selectedChapter}) {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <BlogMobileSidebar
        blogarticle={blogarticle}
        selectedChapter={selectedChapter}
        // progressCount={progressCount}
      />
      {/* <NavbarRoutes />       */}
    </div>
  )
}