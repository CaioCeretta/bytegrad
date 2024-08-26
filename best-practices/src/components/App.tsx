import BackgroundHeading from "./BackgroundHeading";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";
import TodosList from "./TodosList";

function App() {
  return (
    <>
      <BackgroundHeading />

      <main>
        <Header />
        <TodosList />
        <Sidebar />
      </main>

      <Footer />
    </>
  );
}

export default App;