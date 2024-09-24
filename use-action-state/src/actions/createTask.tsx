'use server'

import prisma from "@/db"

import { revalidatePath } from "next/cache"

export async function createTask(previousState, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  try {
    const content = formData.get("content") as string;
    await prisma.task.create({data: {content}})
  } catch(e) {
    return 'An error occured.';
  }

  revalidatePath("/")
}