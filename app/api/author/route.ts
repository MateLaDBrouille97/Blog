import { NextResponse,NextRequest } from "next/server";
import { PrismaClient } from '@prisma/client';
import prismadb from "@lib/prismadb";
import { db } from "@lib/db";

// const prisma = new PrismaClient();

// Import necessary modules
export async function GET(req:NextRequest){
 
  try {
    const author = await prismadb.author.findUnique({
      where: {
        id: process.env.CLIENT_ID_DATABASE,
      },
    });

   

    return NextResponse.json(author);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
 
