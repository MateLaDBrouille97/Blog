"use client";
import React from 'react';
import { Chapter, Blogarticle, UserProgress } from "@prisma/client"
import BlogMobileSidebar from "./blog-mobile-sidebar2";

// import { NavbarRoutes } from "@/components/navbar-routes";


// interface CourseNavbarProps {
//   blogarticle: Blogarticle & {
//     chapters: (Chapter & {
//     //   userProgress: UserProgress[] | null;
//     })[];
//   };
// //   progressCount: number;
// };

export default function BlogArticleNavbar ({ blogarticle,selectedChapterId}) {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <BlogMobileSidebar
        blogarticle={blogarticle}
        selectedChapterId={selectedChapterId}
        // progressCount={progressCount}
      />
      {/* <NavbarRoutes />       */}
    </div>
  )
}