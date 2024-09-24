import { ThemeToggler } from "../ThemeToggler";

export default function Navbar() {
  return (
    <nav className="py-3 dark:bg-gray-500 border-b-gray-200 border-b-2">
      <div className="w-full max-w-screen-xl mx-auto flex
      justify-between items-center px-3">
        <h1 className="text-xl font-bold uppercase flex-1 text-gray-900">
          useActionState Lesson
        </h1>
        <div className="flex flex-1 justify-end">
          <ThemeToggler />
        </div>

      </div>
    </nav>
  )
}