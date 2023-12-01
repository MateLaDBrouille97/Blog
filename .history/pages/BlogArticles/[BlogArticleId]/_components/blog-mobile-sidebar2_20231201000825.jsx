import React from 'react';
import { Menu } from "lucide-react";


import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "../../../../components/ui/sheet";

import BlogArticleSidebar from './blogarticle-sidebar';


 function BlogMobileSidebar ({ blogarticle,selectedChapter})  {

  const [selectedChapterMobile, setSelectedChapterMobile] = useState(null);
  const [selectedChapter2, setSelectedChapter] = useState(null);

  useEffect(() => {
    setSelectedChapterMobile(selectedChapter);
  }, [selectedChapter]);

  const handleSelectChapter = () => {
    setSelectedChapter(selectedChapterMobile);
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

export default BlogMobileSidebar;