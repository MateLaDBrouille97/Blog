
import { Author, Blogarticle, CategoryBlog, SubCategoryBlog } from "@prisma/client";

import { getProgress } from "@/actions/get-progress";
import prismadb from "@/lib/prismadb";

type blogarticlesWithProgressWithCategory = Blogarticle & {
  category: CategoryBlog | null;
  subcategory: SubCategoryBlog | null;
  author: Author | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetBlogarticles = {
  userId: string;
  title?: string;
  categoryId?: string;
};

export const getBlogarticles = async ({
  userId,
  title,
  categoryId
}: GetBlogarticles): Promise<blogarticlesWithProgressWithCategory[]> => {
  try {
    const blogarticles = await prismadb.blogarticle.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        subcategory:true,
        author:true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          }
        },
        // purchases: {
        //   where: {
        //     userId,
        //   }
        // }
      },
      orderBy: {
        createdAt: "desc",
      }
    });

    const blogarticlesWithProgress: blogarticlesWithProgressWithCategory[] = await Promise.all(
      blogarticles.map(async blogarticle => {
        // if (course.purchases.length === 0) {
        //   return {
        //     ...course,
        //     progress: null,
        //   }
        // }

        const progressPercentage = await getProgress(userId, blogarticle.id);

        return {
          ...blogarticle,
          progress: progressPercentage,
        };
      })
    );



    return blogarticlesWithProgress;
  } catch (error) {
    console.log("[GET_BLOGARTICLES]", error);
    return [];
  }
}