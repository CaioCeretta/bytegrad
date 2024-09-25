'use client'

import { addTodo } from "@/actions/actions";
import { useOptimistic, useRef } from "react";
import Button from "../Button";

type Todo = {
  id: string;
  content: string;
}

type TodosComponentProps = {
  todos: Todo[]
}

export default function TodosComponent({todos}: TodosComponentProps) {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [optimisticTodos, addOptimisticTodo] =
   useOptimistic(todos, (state, newTodo: Todo) => {
    return [...state, newTodo]
  })

  return (
    <>
    <form action={async formData => {
      formRef.current?.reset()
      addOptimisticTodo({
        id: Math.random().toString(),
        content: formData.get("content") as string
      })
      await addTodo(formData);

    }} ref={formRef} className="flex flex-col w-[300px my-16">
      <input
        type="text"
        placeholder="Add your todo"
        name="content"
        className='px-4 py-2 mb-3 dark:bg-white bg-gray-200 text-black' required
      />
      <Button />
    </form>

      <ul className="list-disc">
          {optimisticTodos.map(todo => (
            <li key={todo.id}>{todo.content}</li>
          ))}
        </ul>
    </>
  )
}


