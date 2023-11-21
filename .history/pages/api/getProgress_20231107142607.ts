import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from "../../lib/prismadb";


type GetUserProgressQuery= {
    id:string;
    userId?:string;
    chapterId?:string;
    isCompleted?:boolean;


}

type GetChapterQuery = {
    id: string;
    title: string;
    description?: string;
    videoUrl?: string;
    imageUrl?: string;
    position: string;
    isPublished: boolean;
    blogarticleId: string;
   
  }


// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: any, res: any) => {
  const { userId} = req.query as unknown as GetUserProgressQuery;

  const { blogarticleId } = req.query as unknown as GetChapterQuery;

  if (!userId || !blogarticleId) {
    return res.status(400).json({ error: 'userId and blogarticleId are required in the query parameters.' });
  }

  try {
    const publishedChapters = await prismadb.chapter.findMany({
      where: {
        blogarticleId: blogarticleId,
        isPublished: true,
      },
      select: {
        id: true,
      },
    });

    const publishedChapterIds = publishedChapters.map((chapter) => chapter.id);

    const validCompletedChapters = await prismadb.userProgress.count({
      where: {
        userId: userId,
        chapterId: {
          in: publishedChapterIds,
        },
        isCompleted: true,
      },
    });

    const progressPercentage =
      publishedChapterIds.length > 0 ? (validCompletedChapters / publishedChapterIds.length) * 100 : 0;

    res.status(200).json({ progressPercentage });
  } catch (error) {
    console.error('[GET_PROGRESS]', error);
    res.status(500).json({ error: 'An error occurred while fetching progress.' });
  }
};
