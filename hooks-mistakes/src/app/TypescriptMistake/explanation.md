# useState / useEffect "Mistake" nº 7: Typescript "mistake"

A very typical mistake in react, is for example, on the useState of the post, we are saying that it's initially null
and creating a loading state with a boolean value that starts with true, and it's working just fine.

But we are going to have red squigly lines on the properties, because it now says that post is of type null, because
that is the initial value we are passing to the state so typescript is now infering its type.
Loading would be infered as type boolean because we started it as true, which is already correct. Some people even prefer
for the type safety to use something like useState<boolean>(true), it's not needed, but it will still work just fine.

In Typescript, it's a good practice to type the state with the expected shape of the post object we're working with.
For example, if we are managing post state, we should define its type based on the structure of the post object.

However, one thing to be aware of is that the object returned from a fetch call might include additional properties not
explicitly defined in our state type. We would still be able to access them, but, Typescript won't recognize them, leading
to squiggly lines (indicating an error or missing type). By not typing the state correctly, TS won't be aware of those 
additional properties, even though they are present in the fetched object.

So the key here is ensuring the state has a well-defined shape for TS to correctly infer properties, but also understanding
that if there are extra properties outside that shape, TS won't automatically know about them unless we explictly type them.

Back to the post example, it would be something like useState<{title: string, body: string}>() 

One other thing ts helps us, is for example, we utilize something as a generic to the useState, so if we did

useState<{title: string, body: string}>(null), this wouldn't work, because we already told ts what it would be and we're
passing different values