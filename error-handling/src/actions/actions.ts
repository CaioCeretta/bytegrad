"use server"


import prisma from "@/lib/db"
import { error } from "console";
import { revalidatePath } from "next/cache"

export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong"
  }

  return message;
}

export const addTodo = async (formData: FormData) => {
 
  const content = formData.get('content')

    try {
    await prisma.todo.create({
      data: {
        content: content2 as string,
      }
    })
  } catch (error) {
    return {
      error: getErrorMessage(error)
    }
  }

  revalidatePath('/todos')


}