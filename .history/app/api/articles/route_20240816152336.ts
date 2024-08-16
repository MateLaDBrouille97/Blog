import { NextResponse, NextRequest } from "next/server";
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
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
            description: true,
            title: true,
            videoUrl: true,
            imageUrl: true,
            position: true,
            isPublished: true,
            isYoutube: true,
            isFree: true,
            href: true,
            blogarticleId: true,
            createdAt: true,
            youtubeUrl: true,
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

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return new NextResponse("Prisma Client Initialization Error", { status: 500 });
    } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return new NextResponse("Prisma Client Validation Error", { status: 400 });
    } else {
      return new NextResponse("Internal Server Error", { status: 500 });
    }
  } finally {
    await prisma.$disconnect();
  }
}
