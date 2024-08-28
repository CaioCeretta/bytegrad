import { useItemsStore } from "../stores/itemsStore";
import BackgroundHeading from "./BackgroundHeading";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import StatusBar from "./StatusBar";
import TodosList from "./TodosList";

function App() {
  const todos = useItemsStore((state) => state.items);

  const todosCompletedPercentage = todos.length
    ? (todos.filter((todo) => todo.completed).length / todos.length) * 100
    : 0; // Ensure no division by zero

  console.log(todosCompletedPercentage)

  return (
    <>
      <div className="relative bg-[#f1d4b3] min-h-screen flex justify-center items-center flex-col">
        <StatusBar progressPercentage={todosCompletedPercentage} />

        <BackgroundHeading />

        <main className="relative w-[971px] shadow-[0_4px_4px_rgb(0, 0, 0, 0.08)] h-[636px]
      bg-[#fff] rounded-[8px] overflow-hidden grid grid-cols-[7fr_4fr] grid-rows-[59px_1fr]">
          <Header />
          <TodosList />
          <Sidebar />
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App;