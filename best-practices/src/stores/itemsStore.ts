import { create } from "zustand";
import { persist } from "zustand/middleware";
import { initialTodos } from "../lib/constants";
import { Todo, TodosState } from "../lib/types";

export const useItemsStore = create<TodosState>(
  persist(
    (set) => ({
      items: initialTodos, // initialTodos is now correctly typed as Todo[]
      addItem: (newTodoText: string) => {
        const newItem: Todo = {
          id: new Date().getTime(), // Generate a unique ID based on the current time
          content: newTodoText,
          completed: false,
        };

        set((state) => ({ items: [...state.items, newItem] }));
      },
      deleteItem: (id: number) => {
        set((state) => {
          const newItems = state.items.filter((item) => item.id !== id);
          return { items: newItems };
        });
      },
      toggleItem: (id: number) => {
        set((state) => {
          const newItems = state.items.map((item) => {
            if (item.id === id) {
              return { ...item, completed: !item.completed };
            }
            return item;
          });
          return { items: newItems };
        });
      },
      removeAllItems: () => {
        set(() => ({ items: [] }));
      },
      resetToInitial: () => {
        set(() => ({ items: initialTodos }));
      },
      markAllAsComplete: () => {
        set((state) => {
          const newItems = state.items.map((item) => {
            return { ...item, completed: true };
          });
          return { items: newItems };
        });
      },
      markAllAsIncomplete: () => {
        set((state) => {
          const newItems = state.items.map((item) => {
            return { ...item, completed: false };
          });
          return { items: newItems };
        });
      },
    }),
    {
      name: "items", // The key used to store the state in localStorage
    }
  )
);
