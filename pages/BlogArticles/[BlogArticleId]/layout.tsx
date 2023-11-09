// import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "../../../lib/prismadb";
// import { getProgress } from "@/actions/get-progress";

import { BlogArticleSidebar } from "./_components/blogarticle-sidebar";
import { BlogArticleNavbar } from "./_components/blogarticle-navbar";

const BlogArticleLayout = async ({
  children,
  params
}: {
  children: React.ReactNode;
  params: { BlogArticleId: string };
}) => {
//   const { userId } = auth();

//   if (!userId) {
//     return redirect("/")
//   }

  const blogarticle = await prismadb.blogarticle.findUnique({
    where: {
      id: params.BlogArticleId,
    },
    include: {
      chapters: {
        where: {
          isPublished: true,
        },
        // include: {
        //   userProgress: {
        //     where: {
        //       userId,
        //     }
        //   }
        // },
        orderBy: {
          position: "asc"
        }
      },
    },
  });

  if (!blogarticle) {
    return redirect("/");
  }

//   const progressCount = await getProgress(userId, course.id);

  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-80 fixed inset-y-0 w-full z-50">
        <BlogArticleNavbar
          blogarticle={blogarticle}
        //   progressCount={progressCount}
        />
      </div>
      <div className="hidden md:flex h-full w-80 flex-col fixed inset-y-0 z-50">
        <BlogArticleSidebar
          blogarticle={blogarticle}
        //   progressCount={progressCount}
        />
      </div>
      <main className="md:pl-80 pt-[80px] h-full">
        {children}
      </main>
    </div>
  )
}

export default BlogArticleLayout