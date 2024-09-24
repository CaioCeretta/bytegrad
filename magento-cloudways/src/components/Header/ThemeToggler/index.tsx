'use client'

import { useEffect, useState } from "react";
import { BsSunFill } from "react-icons/bs";
import { FaMoon } from "react-icons/fa";

const ThemeToggler = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true)

  useEffect(() => {
    const theme = localStorage.getItem('theme')

    if (theme === 'dark') setDarkMode(true)

  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      
      localStorage.setItem('theme', 'dark')
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }

  }, [darkMode])

  

  return (
    <div className='relative w-16 h-8 flex items-center dark:bg-gray-900
    bg-gray-100 cursor-pointer rounded-full p-1'
      onClick={() => setDarkMode(!darkMode)}>
      <FaMoon className="text-white" size={18} />
      <div
        className="absolute bg-white dark:bg-medium w-6 h-6 rounded-full
      shadow-md transform transition-transform duration-300"

        style={darkMode ? { left: '2px' } : { right: '2px' }}
      />

      <BsSunFill className="ml-auto text-yellow-400" size={18}/>


    </div>
  )
}

export { ThemeToggler };
