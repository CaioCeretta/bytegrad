import { useEffect, useMemo, useState } from "react";
import Select, { SingleValue } from "react-select";
import { TodoType } from "../lib/types";
// import { useItemsStore } from "../stores/itemsStore";
import StartScreen from "./StartScreen";
import TodoItem from "./TodoItem";

export interface TodoListProps {
  todos: TodoType[],
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}


const sortingOptions = [
  { label: "Sort by default", value: "default" },
  { label: "Sort by completed", value: "completed" },
  { label: "Sort by running", value: "running" }
];

export default function TodosList({ todos, onToggleTodo, onDeleteTodo }: TodoListProps) {
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
      {todos.length === 0 && <StartScreen />}

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
        <div className="flex flex-col gap-2">
          <TodoItem
            key={item.id}
            todo={item}
            onDeleteTodo={onDeleteTodo}
            onToggleTodo={onToggleTodo}
          />
        </div>
      ))}
    </ul>
  );
}


