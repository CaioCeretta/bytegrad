import { useState } from "react";
import Button from "./Button";
import { initialItems, initialToDos, initialToDos, MAX_FREE_TODOS, SENSITIVE_WORDS } from "../lib/constants";



export default function AddTodoForm() {

  const [todos, setTodos] = useState(initialToDos)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        if(
          SENSITIVE_WORDS.includes(todos)
        ) {
          alert("Please do not use sensitive information")
          return;
        }

        setTodos(prev => [
          ...prev,
          {
            id: prev.length + 1,
            content: todoContent,
            completed: false
          }
        ])
      }}
  )
}