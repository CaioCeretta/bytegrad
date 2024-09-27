# Error Handling Lesson

Let's use in an example a server action, right now it does not contain any mistake, but what if made one, how will we output
a message to the client.

Here what we have is a h1, a form and we are mapping the todos on a list.

This is a server component and in a server component we can fetch the data from the db, and the form has the action attribute
called server action, the server action we defined in a separate file, which we inform is a server function,  and in the
server component we are getting the form data and try to add it to the db.

So tipically we do wanna wrap the function in a try catch, because adding something to the database could go wrong, so
we are going to try it and attempt to create the todo on the database and if it goes wrong, prisma throws an error, we catch
it, and output it to the client.

Remember that this is all server side, so we need to send something back here to the client, so we can deal with that.

## Types of Returns

**1 - Return a simple error object from the try catch**

The most basic one is a simple javascript object, just a return { error: 'Something went wrong' }, but now what we want
to do, is that we do not immediately want to return this function, such as the action={addTodo}, we may want to have some
client side interactivity here, so we will now call use another function on the action, which will show the error and also
call the server side function.

So we would use another function, in this example, clientAction, which will call the function and pass the formData to the
server action and before we actually invoke that server action, we are going to do the client-side validation, and save the
result of that call to a variable, so we get the response from the server in error cases, so it would be
const result = await addTodo(formData), and the return is only of there is an error, otherwise nothing will be returned.

Because we are using a server component, the TodosComponent, functions cannot be passed directly to client components, so
the ClientAction wouldn't work. So for this to work, we need to refactor the form to a client component, so all the markup
and the clientAction fuction are now going to be passed to this new component

Now in our client action, we are invoking our server action, it still is going to update the list, because the list is not
based on a state, but on the fetched data from the db, and that data is being stored normally.

Now if on the function that deals with the submit, we alert something, it will alert this error returned to the user.

We could also pass a function inline to the form action, such as

<form action={async (formData: FormData) => {

    const result = await addTodo(formData)

    if (result?.error) {
      //Show error
      alert(result.error)
    }
  }} className...
>

This is a separate inline function which works the same.



**2 - Output Toast Message**

In this way we are going to utilize the package of react-hot-toast to achieve this.

First step is to determine where we want to show this toast on the page, so we
need to go in the layout file and put it right on the bottom, before closing the
body, and use something like

<Toaster position="top-right" /> with the position being where we want to show it
on the page.

And now we need to invoke that toast message on function error, e. g.

toast.error('Something went wrong')

toast can also be used for successes, loading, and others, but for now we are using
like 
if (result?.error) {
  //Show error
  toast.error('Something went wrong')
} else {
  toast.success('Todo added')
}

**3 - Error with useState**

If we don't want to use toast messages, we can still use a state variable to display
this error if it exists, so we would create an error state and all the way on the
bottom of the form, we would add this

 {
  error && (
    <p className="text-red-500">{error}</p>
  )
}

and instead of using the toast on the result.error if, we will set the error state.

**3.2 - Get Error Message**

In the example before we were hard coding the error, such as "Something went wrong",
but realistically we want to get the actual error that was thrown here, if we try
to do something like

    return {
      error: error.message
    }

typescript will complain and will say that error is of the type unknown, because
what we catch here we don't really now what this error is going to be, the error
is typed unknown as default.

But unknown is not the proper way to do this in typescript, so we have an utility
function to extract error messages in our server actions.

One custom function to extract this function messages is 

export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "Something went wrong"
  }

  return message;
}


and now we can type the error as a getErrorMessage

    return {
      error: getErrorMessage(error)
    } 

function breakdown

1 - error is instance of error, this is in cases where the user returned it like
new Error(), then we would go in the first if block, in that Error object we are
going to have a message property

2 - The second case is for when, maybe the developer threw something, like

throw {
  message: 'Something went wrong'
}

not an instance of the error class but just an object literal, then we go on the
second if block. The message property could be also a number, that's why we are
returning it casting to a String

3 - Is of the type string

Here we can simply assign it to the variable message

4 - Default, something went wrong

then we return the message.

Now if we try to submit we are going to see that we get a more specific error message







