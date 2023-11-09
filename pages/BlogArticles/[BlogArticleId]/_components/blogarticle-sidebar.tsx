// import { auth } from "@clerk/nextjs";
import { Chapter, Blogarticle, UserProgress } from "@prisma/client"
import { redirect } from "next/navigation";

import prismadb from "../../../../lib/prismadb";
// import { CourseProgress } from "@/components/course-progress";

import { BlogArticleSidebarItem } from "./blog-sidebar-item";

// interface BlogSidebarProps {
//  blogarticle: Blogarticle & {
//     chapters: (Chapter & {
//     //   userProgress: UserProgress[] | null;
//     })[]
//   };
// //   progressCount: number;
// };

// export const BlogArticleSidebar = async ({
//     blogarticle,
// //   progressCount,
// }: BlogSidebarProps) => {
// //   const { userId } = auth();

// //   if (!userId) {
// //     return redirect("/");
// //   }

// //   const purchase = await prismadb.purchase.findUnique({
// //     where: {
// //       userId_courseId: {
// //         userId,
// //         courseId: course.id,
// //       }
// //     }
// //   });

//   return (
//     <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
//       <div className="p-8 flex flex-col border-b">
//         <h1 className="font-semibold">
//           {blogarticle.title}
//         </h1>
//         {/* {purchase && (
//           <div className="mt-10">
//             <CourseProgress
//               variant="success"
//               value={progressCount}
//             />
//           </div>
//         )} */}
//       </div>
//       <div className="flex flex-col w-full">
//         {blogarticle.chapters.map((chapter) => (
//           <BlogArticleSidebarItem
//             key={chapter.id}
//             id={chapter.id}
//             label={chapter.title}
//             // isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
//             blogarticleId={blogarticle.id}
//             // isLocked={!chapter.isFree && !purchase}
//           />
//         ))}
//       </div>
//     </div>
//   )
// }

// Import statements

interface BlogSidebarProps {
    blogarticle: Blogarticle & {
      chapters: (Chapter & {
        // userProgress: UserProgress[] | null;
      })[];
    };
    // progressCount: number;
  }
  
  export const BlogArticleSidebar = ({ blogarticle }: BlogSidebarProps) => {
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
      <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
        <div className="p-8 flex flex-col border-b">
          <h1 className="font-semibold">{blogarticle.title}</h1>
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
              key={chapter.id}
              id={chapter.id}
              label={chapter.title}
              // isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
              blogarticleId={blogarticle.id}
              // isLocked={!chapter.isFree && !purchase}
            />
          ))}
        </div>
      </div>
    );
  };
  