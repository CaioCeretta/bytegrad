

import { FormEvent, useRef, useState } from "react";
import { SENSITIVE_WORDS } from "../lib/constants";
import Button from "./Button";

export default function AddTodoForm({ onAddItem }: {onAddItem: (content: string) => void}) {
  const [todoContent, setTodoContent] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (
      SENSITIVE_WORDS.includes(todoContent)
    ) {
      alert("Please do not use sensitive information")
      return;
    }

    // basic validation
    if (!todoContent) {
      alert("Item can't be empty");
      inputRef.current?.focus();
      return;
    }

    onAddItem(todoContent);
    setTodoContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add an item</h2>
      <input
        ref={inputRef}
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