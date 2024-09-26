"use server"


import prisma from "@/lib/db"
import { revalidatePath } from "next/cache"

export const addTodo = async (formData: FormData) => {

  const content = formData.get('content')

    await prisma.todo.create({
      data: {
        content: content as string,
      }
    })

  revalidatePath('/todos')


}