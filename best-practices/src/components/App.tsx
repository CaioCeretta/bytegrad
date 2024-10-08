import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { useCallback, useEffect, useState } from "react";
import { v4 as uuid } from 'uuid';
import { TodoType } from "../lib/types";
import AddTodoForm from "./AddTodoForm";
import BackgroundHeading from "./BackgroundHeading";
import Button from "./Button";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import StatusBar from "./StatusBar";
import TodosList from "./TodosList";



function App() {
  const [todos, setTodos] = useState<TodoType[]>([])

  const { login, register, user } = useKindeAuth();

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        // Delete todo
      };
    }

    document.addEventListener("keydown", handleEscapeKey);

  }, [])


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const todosCompletedPercentage = todos.length
    ? (todos.filter((todo) => todo.completed).length / todos.length) * 100
    : 0; // Ensure no division by zero


  const handleToggleTodo = (id: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }



  const handleDeleteTodo = (id: string) => {
    setTodos(prevTodos =>
      prevTodos.filter(todo => todo.id !== id)
    )
  }

  const handleAddTodo = useCallback((todoContent: string) => {
    // basic validation
    if (!todoContent) {
      alert("Item can't be empty");
      return;
    }

    setTodos(prevTodos => [
      ...prevTodos,
      { id: uuid(), content: todoContent, completed: false }
    ]);
  }, []);



  return (
    <>

      <div className="relative bg-[#f1d4b3] min-h-screen flex justify-center items-center flex-col">
        <StatusBar progressPercentage={todosCompletedPercentage} />

        <BackgroundHeading />

        <main className="relative w-[971px] shadow-[0_4px_4px_rgb(0, 0, 0, 0.08)] h-[636px]
      bg-[#fff] rounded-[8px] overflow-hidden grid grid-cols-[7fr_4fr] grid-rows-[59px_1fr]">
          <Header />
          <TodosList onDeleteTodo={handleDeleteTodo} onToggleTodo={handleToggleTodo} todos={todos} />
          <Sidebar >
            <AddTodoForm onAddTodo={handleAddTodo} />

            <div className="space-y-2">
              {user?.email}

              <Button type="button" buttonType="secondary" className="my-2" onClick={() => register()} key={'register'} text="Register" />
              <Button type="button" buttonType="secondary" className="my-2" onClick={() => login()} key={'login'} text="Log In" />
            </div>

          </Sidebar>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App;