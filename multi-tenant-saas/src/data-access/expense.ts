import prisma from "@/db";

export async function getExpenses(id: string) {
  const expenses = prisma.expense.findMany({
    where: {
      tenantId: id
    }
  })

  return expenses
}