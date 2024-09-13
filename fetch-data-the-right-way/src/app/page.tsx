import Link from "next/link";

export default function Home() {
  return (
    <div className="h-full">
      <main className="flex-1 flex flex-col h-full items-center justify-center">
        <h1 className="text-4xl font-bold">Home Page</h1>

        <Link href="/article" className="text-2xl">
          Read Article
        </Link>

      </main>
    </div>
  )
}