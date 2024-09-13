import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Text from '@/components/Text';
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Article() {

  // auth check
  const { isAuthenticated } = getKindeServerSession()

  if (!(await isAuthenticated())) {
    redirect("/api/auth/login")
  }

  return (
    <MaxWidthWrapper>
      <main className="flex flex-1 flex-col h-full items-center justify-center">
      <h1 className="text-4xl">Article Title</h1>
      <h2 className="text-3xl"><Text /></h2>
      </main>
    </MaxWidthWrapper>
  )
}