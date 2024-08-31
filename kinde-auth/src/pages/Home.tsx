import ProtectedRoute from "./ProtectedRoute";

function Home() {
  return (
    <>
      <h1 className="text-5xl font-bold mb-3 text-red-500">Welcome to StockPrices</h1>
      <p className="text-2xl">
        In the dashboard you can see the stock prices of your favorite companies.
      </p>

      <ProtectedRoute />
    </>
  );
}
 
export default Home;