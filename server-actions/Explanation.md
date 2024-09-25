# Next.JS Server Actions (revalidePath, useFormStatus & useOptimistic)

First of all we are going to manage a todos page, we are getting the todos from the database, we configured with prisma
and are going to display them by mapping over the list.

These days, what we can in server components is that we can also mutate data, we can add a todo with server action.

In the past, if we were to type a todo and add that data to our listt, we would have to create a onClick for the button,
or an onSubmit for the form and so something like <form onSubmit={handleSubmit}>

function handleSubmit = async (event: FormEvent) => {
  event.preventDefault();

  const content = event.target.content.value;

  fetch('api/todos', {
    method: 'POST',
    body: JSON.stringify({content})
  })
}

we basically would add a function we want to run.

In a server component, it would return us an error on the onSubmit={handleSubmit} because server components are meant to be
non interactive, in this way we're going to learn on this lesson, is that we don't need to convert this to a client component.

We don't need to make the api route and wire it up with the function that we actually want to run when this form gets submitted.

We can use **SERVER ACTIONS** by using like

<form action={addTodo}>

and on a server component we can actually create on the same component something like

const addTodo = async (formData: FormData) => {
  "use server"

  const content = formData.get('content')

  await prisma.todo.create({
    data: {
      content: content as string,
    }
  })


}

<form className="flex flex-col w-[300px my-16" action={addTodo}>

Here we use as an argument the formData of the type formData, it is going to be similar to the event

First thing on that function, we needed to determine it as a "use server" in the beginning of the scope, because this
function will only execute on the server side

Now, because we have an input with the name of content and we can simply access it with formData.get('inputName')

now typically we would set this content to an api route, now we can simply use prisma on this component and add something
like prisma.todo.create({data: content: content as string}). We need to add that as string because typescript is not
100% sure that this is a string, and because it is required on prisma, it cannot be string | null

as the time of the instructor recording, we also had to add one thing into next.config.mjs, which is on the nextConfig
object, add another attribute that is `experimental: {
  serverActions: true
}` to inform ts that this is a server action.

By simply doing the function this way, it will work, but we'll notice one thing, if we click on add, the list will remain
the same, even though in our database it has inserted the new row, our UI is still working with these old todos we have.

To make sure we wil now be working with the new todos, we need to invalidate those old todos and tell nextjs that this
is invalid now and to give us the latest data, so basically, we want to run the findMany again, so we will use a return
to this function saying

revalidadePath('/todos')

and we'll tell nextjs that these todos we are working with, is now invalid, and refetch the data.

## How is it working?

If we go on the dev tools, we can see that there's a communication between client and server, but this is being handled
by NextJS, we are not manually creating an API route, behind the scenes, nextjs is doing that.

By going to the network tab, we will see that when we click the add button, we will see that there's actually a fetch call
being made, by clicking on the todo, which was the request made, and go on the payload tab, we can see that there is some
Form Data going from client to server, we can see a

1_content: Test

Which is the name of the input field and an action id, which is not done by us, but by next.

## What are the benefits?

More than just those benefits of avoiding the creation of an api route, and being able to create it in the server component

This will work, even without javascript enabled, if the user doesn't have access to js on the browser, because of js still
hasn't been loaded; the user disabled it; simply fails to load in the page, this will still work, it is also something called
progressive enhancement, and it also mean that the client side bundle is smaller, because we don't need the js to be included
on that js bundle. 

Another benefit is that this function runs on the server, so we can update our database and immediately revalidate. In the
past, with an API route, we would update the db, go to the client again, and then the client would make another network call
to get the latest data. Here we are doing both of that in one network call, it will go from the client to the server and
immediately revalidate data.

This is a powerful combination, we can fetch the data and update the database afterwards, in some sort of server mutation
as it's called.

## End of benefits section

One other thing we would like to do here, is that we probably would like to reset the form and show something like a loading
indicator, because now if we click on Add we don't get a feedback if something is being submitted.

In the real world, we want to have a client side interactivity, like validating the inputs, both on the client and on the 
server.

Now if we look in our component, this is a server component, the h1 can stay on the server, but with the form, we tipically
want to do some validation before we invoke that server action, we maybe want to reset the form, or things like that, so
we want to do some client side interactivity, so where going to refactor that form into its own component and mark that
as a client component.

Now, that we created a component for the form, that is a client component, we cannot call anymore the function addTodo we
created on the server component, if we want to use a server action like this in a client component, we must create it
somewhere else and then import it in the form.

One approach that is normally used, is to create an actions folder, we can create a file per action, but in this case, let's
create just one actions.ts

So now, our todos page is still a server component, still fetches the database data, and map over that data, inside of it
we have a Form component, which is a client component, and on this client component, we can now import that function we
added to the actions folder.

Now we are going to utilize the 'use server' in the first line and every function we export from that file is going to be
a server action, but we can invoke a server action from a client component, no problem.

Now it will work as expected, the todos page is still going to be revalidated, because we are still invoking the function
on the action, so whenever we click on add, we will invoke the function defined in the action, it will revalidate the todos
path, and everything will work as it was working, but now, refactored for a better maintainability.

## Form feedback to the user

A good practice would be for us to give some feedback while the form is being submitted, so things like reset the form,
validation on the client, so tipically we will not invoke our function in that way we are doing, by calling directly the
server action, normally we will have a function on that action.

In NextJS we can add a function for the action attribute, in HTML, what we would do is that for the action, we would pass
an URL, which would handle this form submit, but on NextJS, we can pass a function to the action, we will immediatelly get
access to the form data being submitted, so the function will be, in this case:

<form action={async formData => {
      formRef.current?.reset()
      await addTodo(formData);
    }} ... />

In this case we are not dealing with a controlled form, what we can do in this case instead is utilize React useRef, add
that ref to the form, and before we invoke the server action on the client, we can say formRef.current.reset()

one thing we need to have in mind is that this is a client component, so everything we do here is being executed on the
client side, only on the await addTodo(formData), when this form actually gets submmited to that function, that will run
on the server.

One downside of using a server action in a client component, is that we lose a lot of that "progressive enhancement",
but in the real world we want that client side validation, that form reset, etc, in the vast majority of
the cases we are going to have a server function been invoked on the client.

## Form Status

**Pending State**

To add a pending state while it is being submitted, we have another hook, and for this to actually work, we do need to
make a separate client component for the button, where the form is going to be an ancestor, so to speak.

Now by pasting the exact same code and importing it into the form, it will work normally.

Now this button is its own component and the hook we can use is formStatus from react dom

const {pending} = useFormStatus(), we can destructure the return of the useFormStatus, it has an action that will show us
the function that is connected to this form, some data, the method of the form and the pending state.

Now it will show us that the form is being submitted based on that pending.

so by adding to the Button, inside the tags, per example

{
  pending ? 'Adding todo...' : 'Add'
}

now when we submit this form, it will show this message while it's being submitted.

**Error handling**

One other important thing is to add error handling, what if this database call, in
our server action, fails?

It is running on the server, so to make sure that if something goes wrong, we can
output some message to the user, we can simply wrap the code in a try catch block, e.g.

try {

    await prisma.todo.create({
      data: {
        content: content as string,
      }
    })
  } catch(e) {
    return {
      error: e
    }
  }

  now if something goes wrong, we are returning an object with a property error
  which holds the error that occurred, and now in the form, where we call the action

  we can destructure the call to something like

 const { error } = await addTodo(formData);

  if(error) {
    alert(error.message)
  }

  now if there is an error, we are immediately getting it back.


## End of Form Status

*useOptimistic*

Optimistic UI is a pattern used to improve user experience by updating the UI immediately, without waiting for the backend
confirmation. The ideia is that most of the time, the request will succeed, so we optimistically update the UI. if something
goes wrong, we revert the changes.

So as a recap, we still have the page, the page is still fetching the data and displaying to the user, but now it's more
refactored.

useOptimistic is a hook that helps manage optimistic updates. It takes two arguments:

1. Initial state: (in this case, our todos list)
2. A function (reducer-like) that receives the current state and the new data we want to optimistically add, in this case,
the new todo. The function defines how the state should be updated.

When we call this hook it returns the optimistic state, which is the UI state that we should display, like the list of todos
with the new optimistic addition and the function to add data to the optimistic state before making the actual API call.

const [optimisticTodos, addOptimisticTodo] =
   useOptimistic(todos, (state, newTodo) => {
    return [...state, newTodo]
  })

And what we get here are two things, as the first array item, we get the todos optimistic and also a function to add an
optimistic .

Now instead of using the todos, we use the optimisticTodos, so we iterate over it and on the action, before we add it to
the database, before we have to wait that two or three seconds, we can optimistically add it here, and to the function of
addOptimisticTodo which is being returned, we can call it before the addTodo.

Now if we save here, and now we try adding something, it immediately gets added to the list.

Key Points to Understand

.Immediate UI Update: addOptimisticTodo is called first to update the UI without delay.

.API Call in the Background: The real request (addTodo) is made in the background. Most of the time, it succeeds, so the
optimistic update stays.

.Fallback (if needed): If the request fails, you should reset or revert the optimistic state to its previous value.


Example of it going wrong: 

We are optimistic now, but what happens if something goes wrong on the server? and one of the benefits of creating the
optimistic pattern in conjunction with server actions.

If we go to the server actions now, and we think that this will work allright, but in the action something went wrong, in
the UI this still going to be shown. We need to be sure that when it fails, it is removed again from the UI.

we will see that if, for example, we change to something like content2: content, content2 does not exist on prisma, so it
will barely show the optimistical add to the list, but in less than a second it will
revert it back to how it was.

Server actions are pretty powerful because not only we don't have to create these API routes, but we also get these hooks,
such as the useOptimistic, FormStatus for pending state.

## formAction attribute

We've learned that we can utilize the form action, but also do this with some other element in the form, so we can also use
form actions, not action={action} but on an input add something like  formAction={action}

in this example we have a <input type="image" formAction={submitImage} />

This is particularly useful if we want to have different server actions for different inputs, or if we have two buttons and
we want to have one server action for one button and another one for the other, because a formAction will run the code that 
is assigned to it, whenever the element is clicked.


















