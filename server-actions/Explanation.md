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

**Pending State**

TO add a pending state while it is being submitted, we have another hook, and for this to actually work, we do need to 











