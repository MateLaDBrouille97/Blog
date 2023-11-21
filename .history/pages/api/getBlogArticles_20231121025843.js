// import { NextApiRequest, NextApiResponse } from 'next';
// import getProgress from './getProgress';
import prismadb from "../../lib/prismadb";
// import { Blogarticle, CategoryBlog, SubCategoryBlog, Author } from '@prisma/client';

// type BlogarticlesWithProgressWithCategory = Blogarticle & {
//   category: CategoryBlog | null;
//   subcategory: SubCategoryBlog | null;
//   author: Author | null;
//   chapters: { id: string }[];
//   progress: number | null;
// };

// type GetBlogarticlesQuery = {
//   userId: string;
//   title?: string;
//   categoryId?: string;
// };



const getBlogArticles = async (req, res) => {
  try {
    const blogarticles = await prismadb?.blogarticle.findMany({
      where: {
        isPublished: true,
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

    res.status(200).json(blogarticles);

  } catch (error) {
    console.error('[GET_BLOGARTICLES]', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default getBlogArticles;

