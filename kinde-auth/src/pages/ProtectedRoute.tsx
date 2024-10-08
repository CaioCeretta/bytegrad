import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import { Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { isLoading, isAuthenticated, login, register } = useKindeAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoading && !isAuthenticated) {
    return (
      <div>
        <h1 className="text-3xl font-medium">Not authenticated</h1>
        <div className="mt-2 flex items-center justify-center gap-3">
          <button
            onClick={() => login()}
            className="bg-zinc-900 text-white px-3 py-2 rounded"
          >
            Login
          </button>
          <button
            onClick={() => register()}
            className="bg-zinc-900 text-white px-3 py-2 rounded"
          >
            Register
          </button>
        </div>
      </div>
    );
  }

  if (!isLoading && isAuthenticated) {
    return <Outlet />;
  }
}