import prismadb from "@/lib/prismadb";
import { Attachment, Chapter } from "@prisma/client";

interface GetChapterProps {
  userId: string;
  blogarticleId: string;
  chapterId: string;
};

export const getChapter = async ({
  userId,
  blogarticleId,
  chapterId,
}: GetChapterProps) => {
  try {
    // const purchase = await prismadb.purchase.findUnique({
    //   where: {
    //     userId_courseId: {
    //       userId,
    //       blogarticleId,
    //     }
    //   }
    // });

    const course = await prismadb.blogarticle.findUnique({
      where: {
        isPublished: true,
        id: blogarticleId,
      },
      select: {
        price: true,
      }
    });

    const chapter = await prismadb.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      }
    });

    if (!chapter || !course) {
      throw new Error("Chapter or course not found");
    }

    let muxData = null;
    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;

    // if (purchase) {
    //   attachments = await db.attachment.findMany({
    //     where: {
    //       courseId: courseId
    //     }
    //   });
    // }

    if (chapter.isFree
        //  || purchase
         ) {
      muxData = await prismadb.muxData.findUnique({
        where: {
          chapterId: chapterId,
        }
      });

      nextChapter = await prismadb.chapter.findFirst({
        where: {
          blogarticleId: blogarticleId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          }
        },
        orderBy: {
          position: "asc",
        }
      });
    }

    const userProgress = await prisma.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        }
      }
    });

    return {
      chapter,
      course,
      muxData,
      attachments,
      nextChapter,
      userProgress,
    //   purchase,
    };
  } catch (error) {
    console.log("[GET_CHAPTER]", error);
    return {
      chapter: null,
      course: null,
      muxData: null,
      attachments: [],
      nextChapter: null,
      userProgress: null,
    //   purchase: null,
    }
  }
}