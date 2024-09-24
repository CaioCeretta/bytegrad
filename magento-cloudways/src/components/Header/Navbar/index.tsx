import { ThemeToggler } from "../ThemeToggler";

export default function Navbar() {
  return (
    <nav className="py-3 dark:bg-dark border-b-gray-200 border-b-2">
      <div className="w-full max-w-screen-xl mx-auto flex
      justify-between items-center">
        <h1 className="text-3xl font-bold uppercase flex-1 text-gray-900">
          Lesson<span className="text-gray-300">Name</span>
        </h1>
        <ul className="flex gap-10 items-center flex-1 justify-end text-gray-900">
          <li>Home</li>
          <li>Learning</li>
        </ul>
        <div className="flex flex-1 justify-end">
          <ThemeToggler />
        </div>

      </div>
    </nav>
  )
}