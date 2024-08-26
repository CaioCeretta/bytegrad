import { useState } from "react";
import Button from "./Button";
import {  initialTodos, MAX_FREE_TODOS, SENSITIVE_WORDS } from "../lib/constants";
import { Todo } from "../lib/types";



export default function AddTodoForm() {

  const [todos, setTodos] = useState<Todo[]>(initialTodos)

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        if(
          SENSITIVE_WORDS.includes(todos[])
        ) {
          alert("Please do not use sensitive information")
          return;
        }

        setTodos(prev => [
          ...prev,
          {
            id: prev.length + 1,
            content: todos.content,
            completed: false
          }
        ])
      }}
  )
}