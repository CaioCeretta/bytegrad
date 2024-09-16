
# 1 Multiple Schema Files

We know we have the root schema for prisma where we tell prisma how we would like that our data to be modelled in a data-
base, so here, initially we have a very simple model named Expense and if we were to create another model, such as transaction
we have to do it in this same file.

But one thing we can do, is that we can split this in multiple files, so, for example. inside the prisma folder, create a
schema folder and create dedicated files for each schema, for example, create a expense.prisma, which will hold the expense
a transaction one, and a main.prisma one, that will hold the datasource and the generator client, we must also utilize the
 previewFeatures = ["prismaSchemaFolder"] in the generator client

The prismaSchemaFolder is a preview feature provided by pPrisma that allows you to split your schema into multiple files.
This features helkps in organizing our Prisma schema better and is specially useful in large projects.

How this works

.Enable the Feature: By adding "prismaSchemaFolder" to previewFeatures, you’re enabling this capability.

.Schema Organization: Your individual model files like expense.prisma and transaction.prisma are automatically merged into a single schema by Prisma during the build process.

The reason we did not have to import the transaction in the expense file, to utilize it as type, is because prisma can
understand and resolve relationships between models across different schema files. This means that even though we're not
explicitly exporting or importing a model definitions between files, Prisma can still recognize and handle relationships
due to its internal schema merging.

For instance, if we have a foreign key relationship between two schemas from different files, prisma will handle this
relationship correctly when merging the schemas

So in conclusion 

The schema folder approach with the prismaSchemaFolder preview feature is a way to keep your Prisma setup modular and organized. It’s a practical choice for larger codebases, providing a clearer structure and making schema management more efficient. The ability of Prisma to resolve relationships between models defined in different files helps maintain the integrity of your schema while keeping your project organized.
