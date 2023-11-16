import { Menu } from "lucide-react";
import { Chapter,Blogarticle, UserProgress } from "@prisma/client";
import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "../../../../components/ui/sheet";

import { BlogArticleSidebar } from "./blogarticle-sidebar";
// import { CourseSidebar } from "./course-sidebar";

// interface CourseMobileSidebarProps {
//   blogarticle: Blogarticle & {
//     chapters: (Chapter & {
//     //   userProgress: UserProgress[] | null;
//     })[];
//   };
// //   progressCount: number;
// };

export const BlogMobileSidebar = ({ 
  blogarticle,
  selectedChapterId
//   progressCount,
}) => {

  const [selectedChapterIdMobile, setSelectedChapterIdMobile] = useState(null);

  useEffect(() => {
    setSelectedChapterIdMobile(selectedChapterId);
  }, [selectedChapterId]);

  const handleSelectChapter = () => {
    setSelectedChapterId(selectedChapterIdMobile);
  };

  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-1 color-red hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-72">
        <BlogArticleSidebar
          blogarticle={blogarticle}
          onSelectChapter={handleSelectChapter}

        //   progressCount={progressCount}
        />
      </SheetContent>
    </Sheet>
  )
}