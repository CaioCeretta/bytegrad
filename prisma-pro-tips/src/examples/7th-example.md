# 7 Prisma Client Extensions

With prisma client we can extend the result of a query, for


return new PrismaClient().$extends({
  result: {
    expense: {
      slug: {
        compute() {
          return 'some string'
        }
      }
    }
  }
})

let's say, that a normal return would return the id, descrption, amount and createdBy, bit if we used it like this
every return to the expense table will return a new property slug with the desired text