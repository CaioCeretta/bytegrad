import { TodoType } from "./types";

export const MAX_FREE_TODOS = 3;

export const SENSITIVE_WORDS = ["password", "credit card"]

export const initialTodos: TodoType[] = [
  {
    id: 1,
    content: "good mood",
    completed: true,
  },
  {
    id: 2,
    content: "passport",
    completed: false,
  },
  {
    id: 3,
    content: "phone charger",
    completed: false,
  },
];