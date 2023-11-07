import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from "../../lib/prismadb";
import { Attachment, Chapter } from '@prisma/client';

interface GetChapterProps {
  userId: string;
  blogarticleId: string;
  chapterId: string;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, blogarticleId, chapterId } = req.query as unknown as GetChapterProps;

    const course = await prismadb.blogarticle.findUnique({
      where: {
        isPublished: true,
        id: blogarticleId,
      },
      select: {
        price: true,
      },
    });

    const chapter = await prismadb.chapter.findUnique({
      where: {
        id: chapterId,
        isPublished: true,
      },
    });

    if (!chapter || !course) {
      return res.status(404).json({ error: 'Chapter or course not found' });
    }

    let muxData = null;
    let attachments: Attachment[] = [];
    let nextChapter: Chapter | null = null;

    if (chapter.isFree) {
      muxData = await prismadb.muxData.findUnique({
        where: {
          chapterId: chapterId,
        },
      });

      nextChapter = await prismadb.chapter.findFirst({
        where: {
          blogarticleId: blogarticleId,
          isPublished: true,
          position: {
            gt: chapter?.position,
          },
        },
        orderBy: {
          position: 'asc',
        },
      });
    }

    const userProgress = await prismadb.userProgress.findUnique({
      where: {
        userId_chapterId: {
          userId,
          chapterId,
        },
      },
    });

    return res.status(200).json({
      chapter,
      course,
      muxData,
      attachments,
      nextChapter,
      userProgress,
    });
  } catch (error) {
    console.error('[GET_CHAPTER]', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};
