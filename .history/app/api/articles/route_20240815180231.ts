// import { NextApiRequest, NextApiResponse } from 'next';
// import getProgress from './getProgress';
import prismadb from "../../../lib/prismadb";
import { NextResponse,NextRequest } from "next/server";
import { PrismaClient } from '@prisma/client';
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

const prisma = new PrismaClient();

export async function GET(req:NextRequest){
  try {
    const blogarticles = await prisma.blogarticle.findMany({
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
            description:true,
            title:true,
            videoUrl:true,
            imageUrl:true,
            position:true,
            isPublished:true,
            isYoutube:true,
            isFree:true,
            href:true,
            blogarticleId:true,
            createdAt:true,
            youtubeUrl:true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

  

    return NextResponse.json(blogarticles);

  } catch (error) {
    console.error('[GET_BLOGARTICLES]', error);
    return new NextResponse("Internal Error", { status: 500 });
  }
};



