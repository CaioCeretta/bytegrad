import { useMemo, useState, useEffect } from "react";
import Select, { SingleValue } from "react-select";
import { TodoType } from "../lib/types";
import { useItemsStore } from "../stores/itemsStore";
import EmptyView from "./EmptyView";

export interface TodoListProps {
  item: TodoType,
  onToggleItem: (id: number) => void;
  onDeleteItem: (id: number) => void;
}

const sortingOptions = [
  { label: "Sort by default", value: "default" },
  { label: "Sort by completed", value: "completed" },
  { label: "Sort by running", value: "running" }
];

export default function TodosList() {
  const items = useItemsStore((state) => state.items);
  const deleteItem = useItemsStore((state) => state.deleteItem);
  const toggleItem = useItemsStore((state) => state.toggleItem);
  const [sortBy, setSortBy] = useState("default");

  const sortedItems = useMemo(() => {
    return [...items].sort((a: TodoType, b: TodoType) => {
      if (sortBy === "completed") {
        return a.completed === b.completed ? 0 : a.completed ? -1 : 1;
      }
      if (sortBy === "running") {
        return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
      }
      return 0;
    });
  }, [items, sortBy]);

  // Debugging: Check the current `sortBy` state
  useEffect(() => {
    console.log("Updated sortBy state:", sortBy);

  }, [sortBy]);

  console.log(sortedItems)

  return (
    <ul className="item-list">
      {items.length === 0 ? <EmptyView /> : null}

      {items.length > 0 && (
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
          item={item}
          onDeleteItem={deleteItem}
          onToggleItem={toggleItem}
        />
      ))}
    </ul>
  );
}

function Todo({ item, onDeleteItem, onToggleItem }: TodoListProps) {
  return (
    <li className="item">
      <label>
        <input
          onChange={() => onToggleItem(item.id)}
          checked={item.completed ? true : false}
          type="checkbox"
        />{" "}
        {item.content}
      </label>

      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}
