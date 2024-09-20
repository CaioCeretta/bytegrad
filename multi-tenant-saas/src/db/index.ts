import {PrismaClient} from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

/*

1. Declare Keyword: 
declare keyword is used in Typescript to tell the compiler that this variable exists in the code, but we're not defining
it here, is a way of telling TypeScript, "Trust me, this variable will exist in runtime"

2. GlobalThis: 

globalThis is a built in object in JS that provides access to the global object in all environments (browser, node.js, etc)
globalThis refers to the global scope, similar to global

Here we are saying that "i'm declaring a globalThis variable that extends the built in globalThis object with an additionalk
property `prismaGlobal`"

3. Type Definition (: { prismaGlobal: ... }):

After the colon `:`, we are providing a type for globalThis. This is not a value assignment, but a type annotation

The type says that globalThis will have a property prismaGlobal, which is of type ReturnType<typeof prismaClientSingleton>

ReturnType is a TypeScript utility type that extracts the return type of a given function. Here, it essentially infers
that prismaGlobal will have the type PrismaClient.

4. prismaGlobal type:

The prismaGlobal is typed as whatever type type is returned by the prismaClientSingleton function, which in this case is
a new instance of PrismaClient

5. Intersection Type } & typeof global

The & symbol represents an intersection type. In this case we are combining two types

{ prismaGlobal: ReturnType<typeof prismaClientSingleton> }: This is the object you just defined, which includes prismaGlobal.

6: Summary

So basically, declare isn't modifying the object or variable. It declares a type for an existint object, we are extending
the type of globalThis by saying, "In addition to the properties it already has, it may also have a property called prismaGlobal"
prismaGlobal will be treated as part of globalThis by TS, but only if it exists at runtime

So in1


*/
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global;


/*
  This line is checking if globalThis.prismaGlobal object (which represents the global object in JS, like window in browsers
  or global in Node.js ) has a property prismaGlobal, this property would store a shared instance of prisma

  ?? is a nullish coalescing operator, this operator checks if the left-hand value (globalThis.prismaGlobal) is either
  null or undefined. If it is, it will evaluate the right-hand side prismaClientSingleton()

  in a nullish coallescing operator, if is not null or undefined, it will assign the left hand side to the prisma const
*/
const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();


export default prisma;

