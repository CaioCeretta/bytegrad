"use server"


import prisma from "@/lib/db"
import console from "console"
import { revalidatePath } from "next/cache"

export const addTodo = async (formData: FormData) => {

  const content = formData.get('content')

  try {
    await prisma.todo.create({
      data: {
        content: content as string,
      }
    })
  } catch (e) {
    console.log(e)
  }


  revalidatePath('/todos')


}