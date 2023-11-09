import { Menu } from "lucide-react";
import { Chapter,Blogarticle, UserProgress } from "@prisma/client";

import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "../../../../components/ui/sheet";

import { BlogArticleSidebar } from "./blogarticle-sidebar";
// import { CourseSidebar } from "./course-sidebar";

interface CourseMobileSidebarProps {
  blogarticle: Blogarticle & {
    chapters: (Chapter & {
    //   userProgress: UserProgress[] | null;
    })[];
  };
//   progressCount: number;
};

export const BlogMobileSidebar = ({ 
  blogarticle,
//   progressCount,
}: CourseMobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white w-72">
        <BlogArticleSidebar
          blogarticle={blogarticle}
        //   progressCount={progressCount}
        />
      </SheetContent>
    </Sheet>
  )
}