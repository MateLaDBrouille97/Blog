import { Chapter, Blogarticle, UserProgress } from "@prisma/client"

// import { NavbarRoutes } from "@/components/navbar-routes";

import { BlogMobileSidebar } from "./blog-mobile-sidebar";

// interface CourseNavbarProps {
//   blogarticle: Blogarticle & {
//     chapters: (Chapter & {
//     //   userProgress: UserProgress[] | null;
//     })[];
//   };
// //   progressCount: number;
// };

export const BlogArticleNavbar = ({
  blogarticle,selectedChapterId
  
//   progressCount,
}) => {
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