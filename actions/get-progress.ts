import prismadb from "@/lib/prismadb";

export const getProgress = async (
  userId: string,
  blogarticleId: string,
): Promise<number> => {
  try {
    const publishedChapters = await prismadb.chapter.findMany({
      where: {
        blogarticleId: blogarticleId,
        isPublished: true,
      },
      select: {
        id: true,
      }
    });

    const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);

    const validCompletedChapters = await prismadb.userProgress.count({
      where: {
        userId: userId,
        chapterId: {
          in: publishedChapterIds,
        },
        isCompleted: true,
      }
    });

    const progressPercentage = (validCompletedChapters / publishedChapterIds.length) * 100;

    return progressPercentage;
  } catch (error) {
    console.log("[GET_PROGRESS]", error);
    return 0;
  }
}