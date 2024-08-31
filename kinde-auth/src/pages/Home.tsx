import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import ProtectedRoute from "./ProtectedRoute";

function Home() {
  const { logout, isAuthenticated, user } = useKindeAuth()

  return (
    <>
      <h1 className="text-5xl font-bold mb-3 text-red-500">Welcome to StockPrices</h1>
      <p className="text-2xl">
        In the dashboard you can see the stock prices of your favorite companies.
      </p>

      <div className="my-5">
        <ProtectedRoute />
      </div>

      {
        isAuthenticated && (
          <div className="space-y-2 mt-10 mb-5">
            <p>Your name: {user?.given_name}</p>
            <p>Your email: {user?.email}</p>
            <img src={user?.picture} alt="user" />

            <pre>{JSON.stringify(user, null, 2)}</pre>

            <button
              onClick={() => logout()}
              type="button"
              className="bg-zinc-900 text-white px-3 py-2 rounded"
            >
              Log Out
            </button>
          </div>
        )
      }
    </>
  );
}

export default Home;