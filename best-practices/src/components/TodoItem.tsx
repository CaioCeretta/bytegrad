import { TodoType } from "../lib/types";
import { capitalizeFirstLetter } from "../lib/utils";
import DeleteButton from "./DeleteButton";

export interface TodoProps {
  todo: TodoType,
  onToggleTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
}

function TodoItem({ todo, onDeleteTodo, onToggleTodo }: TodoProps) {
  return (
    <>
      <button onClick={() => onToggleTodo(todo.id)}>
        <li className={`flex justify-between items-center px-8 h-[50px] text-[14px]
    cursor-pointer border-b border-b-[rgba(0, 0, 0, 0.08)]`}>
          <span className={`flex gap-2 ${todo.completed ? "line-through text-[#ccc]" : ""}`}>
            {capitalizeFirstLetter(todo.content)}

            <DeleteButton onDelete={onDeleteTodo} id={todo.id}></DeleteButton>
          </span>

        </li>
      </button>
    </>
  );
}

export default TodoItem