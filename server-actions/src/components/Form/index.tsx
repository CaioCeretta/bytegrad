'use client'

import { addTodo } from "@/actions/actions";
import { useRef } from "react";


export default function Form() {
  const formRef = useRef<HTMLFormElement | null>(null)


  return (
    <form action={async formData => {
      formRef.current?.reset()
      await addTodo(formData);
    }} ref={formRef} className="flex flex-col w-[300px my-16">
      <input type="text" placeholder="Add your todo" name="content" className='px-4 py-2 mb-3 dark:bg-white bg-gray-200 text-black' required />
      <button type="submit" className="rounded-md bg-sky-700 text-white">
        Add
      </button>
    </form>
  )
}


