# 2 - Global Omit

Prisma has a global omuit API, so a traditional example, would be, we have a model User, with id, email as unique, and
password as string, and that is very sensitive data, so some of these fields we don't want to get it out from the db,
basically, all kinds of sensitive datas are something to be careful with and keep that in the database.
So how we make sure that when we make a query, for example, the expense table has a column of createdBy, to tell which user
created that row.

What we are used to do is make a query and select all the fields we would like, like

const expenses = await prisma.expense.findMany({
  select: {
    id: true,
    description: true,
    amount: true
  }
})

this would be a case where we don't want to get the createdBy field, but a better option would be globally omitting
the column we don't want to show.

Fiest we need to at the previewFeatures with the value of "omitApi", now prisma will overshoot a global omit Api and to
utilize it, we go to where we instantiate Prisma, and where we instantiate the Prisma Client, we go now type it like

const prismaClientSingleton = () => {
  return new PrismaClient({
    omit: {
      expense: {
        createdBy: true
      }
    }
  })
}

now if we utilize the prisma.expense.findMany, we will see that the values returned are going to be, all the values except
for the expense createdBy

