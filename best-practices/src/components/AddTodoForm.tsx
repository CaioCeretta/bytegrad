

import { FormEvent, useState } from "react";
import Button from "./Button";

interface addToDoProps {
  // setTodos: React.Dispatch<SetStateAction<TodoType[]>>;
  handleAddTodo: (content: string) => void;
}

export default function AddTodoForm({ handleAddTodo }: addToDoProps) {
  const [todoContent, setTodoContent] = useState("");


  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // update state
    handleAddTodo(todoContent)

    // if(todos.length > 10) {
    // setModalCOntent(`You have now added ${todos.length}, please upgrade your plan to pro to add more`)

    // setIsModalOpen(true)
    // }
  
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