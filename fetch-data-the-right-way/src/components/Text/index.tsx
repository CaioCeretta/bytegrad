import { getArticle } from "@/data-access/article"

export default async function index() {
  const articleData = await getArticle()

  return <p>{articleData?.text}</p>
}
