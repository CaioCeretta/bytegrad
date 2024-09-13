import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function getArticle() {

  // auth check
  const { isAuthenticated } = getKindeServerSession()

  if (!(await isAuthenticated())) {
    redirect("/api/auth/login")
  }

  // database interaction
  const articleData = await db.article.findFirst()

  return articleData
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