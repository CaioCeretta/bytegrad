import { useEffect, useMemo, useState } from "react";
import Select, { SingleValue } from "react-select";
import { TodoType } from "../lib/types";
// import { useItemsStore } from "../stores/itemsStore";
import EmptyView from "./EmptyView";

export interface TodoListProps {
  todos: TodoType[],
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
}

export interface TodoProps {
  todo: TodoType,
  onToggleTodo: (id: number) => void;
  onDeleteTodo: (id: number) => void;
}

const sortingOptions = [
  { label: "Sort by default", value: "default" },
  { label: "Sort by completed", value: "completed" },
  { label: "Sort by running", value: "running" }
];

export default function TodosList({todos, onToggleTodo, onDeleteTodo}: TodoListProps) {
  // const items = useItemsStore((state) => state.items);
  // const deleteItem = useItemsStore((state) => state.deleteItem);
  // const toggleItem = useItemsStore((state) => state.toggleItem);
  const [sortBy, setSortBy] = useState("default");

  

  const sortedItems = useMemo(() => {
    return [...todos].sort((a: TodoType, b: TodoType) => {
      if (sortBy === "completed") {
        return a.completed === b.completed ? 0 : a.completed ? -1 : 1;
      }
      if (sortBy === "running") {
        return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
      }
      return 0;
    });
  }, [todos, sortBy]);

  // Debugging: Check the current `sortBy` state
  useEffect(() => {
    console.log("Updated sortBy state:", sortBy);
    
  }, [sortBy]);

  console.log(sortedItems)

  return (
    <ul className="item-list">
      {todos.length === 0 ? <EmptyView /> : null}

      {todos.length > 0 && (
        <section className="sorting">
          <Select
            onChange={(option: SingleValue<{ value: string; label: string }>) => {
              console.log("Selected option:", option);
              if (option) {
                setSortBy(option.value);
              }
            }}
            value={sortingOptions.find(option => option.value === sortBy)}
            options={sortingOptions}
          />
        </section>
      )}


      {sortedItems.map((item) => (
        <Todo
          key={item.id}
          todo={item}
          onDeleteTodo={onDeleteTodo}
          onToggleTodo={onToggleTodo}
        />
      ))}
    </ul>
  );
}

function Todo({ todo, onDeleteTodo, onToggleTodo }: TodoProps) {
  return (
    <li className="item">
      <label>
        <input
          onChange={() => onToggleTodo(todo.id)}
          checked={todo.completed ? true : false}
          type="checkbox"
        />{" "}
        {todo.content}
      </label>

      <button onClick={() => onDeleteTodo(todo.id)}>❌</button>
    </li>
  );
}
