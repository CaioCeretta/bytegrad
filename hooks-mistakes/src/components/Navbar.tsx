import Link from "next/link"
import MaxWidthWrapper from "./MaxWidthWrapper"

const Navbar = async () => {
  return (
    <nav className="sticky inset-x-0 z-[100] h-14 w-full border-b border-gray-200 bg-zinc-800">
      <MaxWidthWrapper className="flex justify-center items-center">
        <div>
          <Link href="/">
            <p className="font-bold text-xl text-white">Hooks Mistakes Examples</p>
          </Link>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar