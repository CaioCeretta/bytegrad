# 4 - Prisma accelerate

Another really amazing feature that help us to optimize our prisma interaction with our database even more than some other
orms features.

Now we can have an optimization in production, like caching for example, the first one we will talk about is `Prisma Accelerate`

Prisma accelerate helps us making our queries much faster, and it does so by essentually becoming a caching layer, it also
helps us by pooling our connections, which is very important for serverless and edge apps. If for example, we deploy the
project to a host like vercel, vercel will actually turn the code into a bunch of serverless functions as well as some 
edge functions.

Let's use this piece of code: const expenses = await prisma.expense.findMany();

This piece of code could very well be running in a serverless function. Serverless edge functions have many benefits, but
it may cause an issue with all the connections that are being spawned when there's new requests coming in.

For example when we have a database. Most databases have a connection limit, if we have a new request coming in, it's going
to spawn a new serverless function and that one will have its own new connection to the db, and if we have too many of
these in our database, the database might "think"

Well, there are to many connection and may refuse to serve any other requests. 

For example, an e-commerce website on a black friday where we have a spike in traffic, this is something for us to be
mindfull of.

This is where Prisma accelerate can really help us. We do not want even to reach out to our db if it's not necessary.
For example, if we are fetching this data like the expenses and the result will be the same for an user as well, we do
not want to have to reach out to the database over and over again, we can just fetch it once and if someone else comes
we can give the same results.

If there is an incoming request, initially we may go all the way to our database, but the second time, third time, and so
on, we will actually just reach out to a prisma server which has cached that result from before, now it should become faster
but also reduce the load on our database.

So let's use for example a login page, if we click on the log in, we will see something like this, here we can set a Prisma
accelerate as well as pulse.
We'll use the login page as an example, if we clicked to enable accelerate. For it, we need to give our database connection
string, create, for example a postgres database in vercel, get the credentials of this db using accelerate and place that
into the our app.

Back to the example, we now enable accelerate in our code and initialize it with the prisma accelerate
const prisma = new PrismaClient().$extends(withAccelerate()) and now we make a fetch we pass, for example, the caching
strategy

await prisma.expense.findMany({
  cacheStrategy: { ttl: 60 }
})

here i'm saying on the query that the time to live of this query is of 60 seconds, so if in a span of 60 seconds, more than
one user makes the same query, the results will be the same.

We are not going to be able to view the result because we are just one customer, but if we go inside the dashboard, we will
see the queries that were ever made, and we can also see how many of them hit the cache and half of the queries were made
by the cache, how much it improved the latency and performance.

