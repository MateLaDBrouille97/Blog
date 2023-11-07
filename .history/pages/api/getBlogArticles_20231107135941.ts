import { NextApiRequest, NextApiResponse } from 'next';
import getProgress from './getProgress';
import prismadb from '@/lib/prismadb';
import { Blogarticle, CategoryBlog, SubCategoryBlog, Author } from '@prisma/client';

type BlogarticlesWithProgressWithCategory = Blogarticle & {
  category: CategoryBlog | null;
  subcategory: SubCategoryBlog | null;
  author: Author | null;
  chapters: { id: string }[];
  progress: number | null;
};

type GetBlogarticlesQuery = {
  userId: string;
  title?: string;
  categoryId?: string;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
const { userId, title, categoryId } = req.query as unknown as GetBlogarticlesQuery;
  try {
    

    const blogarticles = await prismadb.blogarticle.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title || '',
        },
        categoryId: categoryId || undefined,
      },
      include: {
        category: true,
        subcategory: true,
        author: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const blogarticlesWithProgress: BlogarticlesWithProgressWithCategory[] = await Promise.all(
      blogarticles.map(async (blogarticle) => {
        const progressPercentage = await getProgress(userId, blogarticle.id);
        return {
          ...blogarticle,
          progress: progressPercentage,
        };
      })
    );

    res.status(200).json(blogarticlesWithProgress);
  } catch (error) {
    console.error('[GET_BLOGARTICLES]', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
