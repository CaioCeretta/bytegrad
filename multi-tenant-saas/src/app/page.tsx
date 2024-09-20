import prisma from "@/db";

export default async function Home() {

  const expenses = await prisma.expense.findMany({
    where: {
      tenantId: 5
    }
  })

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <main className="flex min-h-screen flex-col items-center pt-24 gap-y-5">
        <h1 className="text-[35px] font-bold">All Expenses</h1>
        <ul className="text-center space-y-2">
          {expenses.map((expense) => (
            <li key={expense.id}>
              {expense.description}{' '}
              {expense.amount}
            </li>
          ))}
        </ul>

      </main>
    </div>
  );
}
