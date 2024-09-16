# Database-level JOINs

If, for example, if we have some kind of data that is in different tables, and needs to be merged in someway we need to
make joins, for example, we have this relation where the expense has more than one transaction.

Traditionally in prisma, to join that type of data, we would have to do

 const expenses = await prisma.expense.findMany({
  include: {
    transactions: true
  }
 })

 by default. it would be a join and prisma will send a query to join this data, but prisma, now allows us to have these joins
 at databae level, so i will list some of the options we now have

 relationLoadStrategy: We can chose whether we want the fetch to it to be on the application level or at the database level,
 by the time of this lesson we need to add the relationJoins into the previewFeatures, so one example would be


relationStrategy: "join" < database level
relationStrategy: "query" < application level

in most cases the database join will be more efficient, and that's why is the default, but in some edge cases we would
prefer to have a separate query for each table.
