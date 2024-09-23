import { getExpenses } from "@/data-access/expense";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const {getOrganization, getPermissions} = getKindeServerSession()

  const result = await getPermissions()

  if (!result?.permissions.includes("view:expenses")) {
    return redirect("/unauthorized")
  }

  console.log(result)

  const organization = await getOrganization()

  if(!organization || !organization.orgCode) {
    return redirect("api/auth/login")
  }

  const expenses = await getExpenses(result.orgCode)


  return (
    <div>
      <main className="flex min-h-screen flex-col items-center pt-24 gap-y-5">

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
