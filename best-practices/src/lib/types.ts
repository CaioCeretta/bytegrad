export type TodoType = {
  id: string;
  content: string;
  completed: boolean;
}



export interface TodosState {
  items: TodoType[];
  addItem: (newTodoText: string) => void;
  deleteItem: (id: number) => void;
  toggleItem: (id: number) => void;
  removeAllItems: () => void;
  resetToInitial: () => void;
  markAllAsComplete: () => void;
  markAllAsIncomplete: () => void;
}