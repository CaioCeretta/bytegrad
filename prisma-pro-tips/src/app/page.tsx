import prisma from "@/db";

export default async function Home() {

  const expenses = await prisma.expense.findMany({
    relation: "query"
  })

  return (
    <main className="flex flex-col justify-center items-center pt-24">
      <h1 className="text-4xl font-bold mb-4">All Expenses</h1>
    <ul className="text-center space-y-2">
      {expenses.map(expense => (
        <li key={expense.id}>
          <p>{expense.description}</p>
          <p>{expense.amount}</p>
        </li>
      ))}
    </ul>
    </main>
      
  
    );
}
