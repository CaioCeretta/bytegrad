import prisma from "@/db";
import { getKindeServerSession, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home() {
  const expenses = await prisma.expense.findMany({
    where: {
      tenantId: 5,
    },
  });

  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <div>
      <main className="flex min-h-screen flex-col items-center pt-24 gap-y-5">
        <div className="flex gap-2">
          {user ? (
            <LogoutLink className="bg-transparent ring-black">Log Out</LogoutLink>
          ) : (
            <LoginLink className="bg-transparent ring-black">Login</LoginLink>
          )}
        </div>

        <h1 className="text-[35px] font-bold">All Expenses</h1>
        <ul className="text-center space-y-2">
          {expenses.map((expense) => (
            <li key={expense.id}>
              {expense.description} {expense.amount}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
