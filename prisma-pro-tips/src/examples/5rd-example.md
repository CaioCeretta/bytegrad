# 5 Performance checklist for Prisma ORM

  . Host server and database in the same region

    We must make sure we host our database as close as possible to our region

  . Add indexes to column that are frequently used in our queries

    Indexes are data structures that improv the speed of a data retrieval operations on a database. Think of them as a way
    to make searching through data quicker, similar to how an index in a book helps us to find information faster. Index
    are particularly useful in columns that are frequently accessed in queries, specially when we perform read operations.
    
    For example, if we often search or filter our data based on a certain column, an index on that column can make those
    queries more efficient.

    As an example to this, if we go to the schema file and we know that often i'm going to query the expenses by the amount
    we should create a index for that, it would be

    @@index([amount])

    without this index, the database might need to scan the entire table to find the matching rows, which can be slow,
    specially if the table has many rows. By doing this, we create a data structure that allows the database to quickly
    locate rows based on the amoun value, thereby speeding up these queries.

. Add a caching layer to your DB (e.g Prisma Accelerate)

  This is a big one, because we do not want to go to our database every single time, because the results may be the same,
  cache will reduce the load in our database and improve performance

. Prisma Studio

Nice UI where we can visualize and handle the data in our database.

