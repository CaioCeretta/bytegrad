import { Outlet } from "react-router-dom";


export default function RootLayout() {
  return (
    <div className="min-h-screen flex">
      <div>
        <main className="flex flex-col pt-10 items-center">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

