// import { auth } from "@clerk/nextjs";
import React from 'react';

import { redirect } from "next/navigation";


// import { CourseProgress } from "@/components/course-progress";

import  BlogArticleSidebarItem  from "./blog-sidebar-item";


// interface BlogSidebarProps {
//   blogarticle: Blogarticle & {
//     chapters: (Chapter & {
//       // userProgress: UserProgress[] | null;
//     })[];
//   };
//   // progressCount: number;
// }

export default function BlogArticleSidebar  ({ blogarticle,onSelectChapter }) {
  // You can handle asynchronous operations here, if needed
  // const [progressCount, setProgressCount] = useState<number | null>(null);

  // useEffect(() => {
  //   async function fetchData() {
  //     // Fetch progress count here
  //     const progress = await getProgress(); // Replace with your actual function
  //     setProgressCount(progress);
  //   }

  //   fetchData();
  // }, []);

  return (
    <div className="h-[80%] border-r flex flex-col overflow-y-auto shadow-sm">
      <div className="p-8 flex flex-col border-b mt-10 md:hidden">
        {/* <h1 className="font-semibold">{blogarticle.title}</h1> */}
        {/* {progressCount !== null && (
          <div className="mt-10">
            {/* Render your progress component here */}
            {/* <CourseProgress variant="success" value={progressCount} />
          </div>
        )} */}
      </div>
      <div className="flex flex-col w-full">
        {blogarticle.chapters.map((chapter) => (
          <BlogArticleSidebarItem
            chapterBA={chapter}
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            // isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            blogarticleId={blogarticle.id}
            // isLocked={!chapter.isFree && !purchase}
            onSelectChapter={onSelectChapter}
          />
        ))}
      </div>
    </div>
  );
};
