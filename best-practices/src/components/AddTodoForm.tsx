

import { FormEvent, SetStateAction, useState } from "react";
import { TodoType } from "../lib/types";
import Button from "./Button";

interface addToDoProps {
  setTodos: React.Dispatch<SetStateAction<TodoType[]>>;
}

export default function AddTodoForm({ setTodos }: addToDoProps) {
  const [todoContent, setTodoContent] = useState("");

    const handleAddTodo = () => {
    // basic validation
    if (!todoContent) {
      alert("Item can't be empty");
      return;
    }

    setTodos(prevTodos => [
      ...prevTodos,
      {id: prevTodos.length + 1, content: todoContent, completed: false}
    ]);
    setTodoContent(""); 
  };
  

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    handleAddTodo()
  
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add an item</h2>
      <input
        value={todoContent}
        onChange={(e) => {
          setTodoContent(e.target.value);
        }}
        autoFocus
      />
      <Button type="submit">Add to list</Button>
    </form>
  );
}