

import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

type ArticleDataDTO = {
  id: string,
  text: string,
  slug: string
}

const createArticleDTO = (articleData: {id: string; text: string}): ArticleDataDTO => {
  return {
    id: articleData.id,
    text: articleData.text,
    slug: articleData.text.slice(0, 10)
  }
}

export async function getArticle() {

  // auth check
  const { isAuthenticated } = getKindeServerSession()

  if (!(await isAuthenticated())) {
    redirect("/api/auth/login")
  }

  // database interaction
  // const articleData = await db.article.findFirst({
  //   select: {
  //     text: true,
  //   }
  // })

  const articleData = await db.article.findFirst()

  if(!articleData) {
    throw new Error('Article not found')
  }

  return createArticleDTO(articleData)
}

export async function updateArticle() {
  // auth check
  const { isAuthenticated } = getKindeServerSession()

  if (!(await isAuthenticated())) {
    redirect("/api/auth/login")
  }
}

export async function deleteArticle() {
  // auth check
  const { isAuthenticated } = getKindeServerSession()

  if (!(await isAuthenticated())) {
    redirect("/api/auth/login")
  }
}