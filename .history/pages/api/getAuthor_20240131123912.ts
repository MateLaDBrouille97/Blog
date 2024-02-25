import { NextResponse,NextRequest } from "next/server";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Import necessary modules
const  getAuthor = async(req:NextRequest,res:NextResponse) =>{
 
  try {
    const author = await prisma.author.findUnique({
      where: {
        id: "9bf6e7a7-a841-43ff-9bc2-44315d155604",
      },
    });

    return NextResponse.json(author);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
 export default getAuthor;
