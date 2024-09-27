import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { content } = await req.json();

  await prisma.todo.create({
    data: {
      content: content as string
    }
  })

  return NextResponse.json({success: true})
}