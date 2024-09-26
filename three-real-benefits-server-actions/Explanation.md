# 3 Real benefits of Next.JS Server Actions

  We are using here the same project we used in the lesson about server actions, in this video we are going to talk about
the real benefits and compare the old way of doing it to the new way.

Here we have just a simple todos page, we have a list of todos and we can add a todo by clicking on the button. 

Ways of achieving the same result:

## Old Way

In the old may we have a form, an onSubmit to this form, such as

<form onSubmit={handleSubmit}>
<input
  type="text"
  name="content"
  placeholder="Write your todo..."
  required
  value={inputText}  
  onChange={(e) => setInputText(e.target.value)}
/>
<button>Add</button>
</form>

In the old way we have a form, inside of it we have an input and a simple button. This form will listen to the onSubmit.
When the form is submitted, the onSubmit will listen to the button click, call the event handler and fetch call to one of our
API endpoints.

This is how we would do it traditionally

## First Benefit

### New Way

 <form action={addTodo}>
      <input
        type="text"
        name="content"
        placeholder="Write your todo..."
        required
      />

      <button>Add</button>
    </form>

In this way, we don't even have to scroll the page, it's all in view, we still have an input and a button, but now we have
this action attribute, we were used to seeing that action attribute when we were using php or any plain HTML before, we
could use an URL and then the browser would submit the formData to that url, but in NextJS these days, we don't pass an url
anymore, we pass just plain JS function, which is most of the times, a server action.

This approach is much cleaner, we don't need a fetch call, or axios, we also don't need to keep track of the state, or useRef,

so in the two approaches, we have basically removed the entire handleSubmit, we don't need that anymore, we only need to pass
a server function to the action attribute


#### Backend

. Old way - without server actions (api route)

Traditionally, we would have to submit this to the API endpoint, we have created an API endpoint which is the /api/todos
in NodeJS we would use something like express. In NextJS we will have an api route, such ass

app/api/todos/route.ts 

And we could absolutely still do it like this, there are some exceptions, but then we would have our route and here in
NextJS we would have to do it like this, we are exporting a POST function here, we grab the request, we grab the content,
parse it as JSON and use prisma to create the actual todo item in our database and then we can return some NextResponse.

. New Way - with server actions 

here we have this addTodo function which is called on action={addTodo}

Here on the action file at the top will have 'use server', that is saying that this function is only going being executed 
in the server, and it's just an async js function, it takes a formData as argument, nextJs will make sure we got access to
that formData automatically.

Different from the old way, where the form was controlled, we had to use useState to keep track of the inputs, onChange
to update the state,  then on the route we would have access from the variable being sent by the request, and so on.

On this new case, we don't have to do it anymore, we can simply add the function to the action, then on the function use
the formData as parameter, nextJS will do the trick and we'll have access to all the inputs, then we just return a normal
js to the user not a whole handleSubmit.

And this is automatically stringified for us under the hood by next js.

We also don't need to pay attention to the structure of our folder, is just a normal js function we create by just adding
"use server" at the top of the file  and exporting it.

Basically our api route has just become a normal js function, put the business logic in our function, and just invoke
that function by adding it to the action, because we don't have anymore to submit something manually like that, it's all
handled for us behind the scenes.

If, for example, we inspect the page, we can look at the network tab and when we click on the add button, we can see that
a todos fetch request happening and eventually the todo gets added to the page. By taking a look at that fetch request. This
is using a server action, and we are not writing a fetch/axios, we will see that on the payload of that fetch request it
has the content we are passing to it, and an action identifier for next 


## Second benefit - Loading state easier

In server actions, it makes the loading state easier. Traditionally if we want to show a loading state, we would create a
loading state, like const [isLoading, setIsLoading] = useState(false)

### Old way

then before doing the fetch call we would set it to true, and after it, we would set it to false again. Then on the button
we would also add some logic like

<button disabled={isLoading}>
  {
    isSubmitting ? 'Adding...' : 'Add'
  }
</button>

this would give the user some feedback that there is something happening.

## New Way

Here we can utilize the useFormStatus hook, and one of the things this hook gives to us, is if the form is pending or not

like this: const { pending } = useFormStatus()

<button> { pending ? 'Adding...' : 'Add' }</button>

Here we are going to get the same result, but this is much cleaner.

One caveat to this, is that right now this won't work, because we need to make  this button its own child component of this
and we need to use the hook in there, because the form with the server action needs to be ancestor from where we are using
this hook.

### Form Status Hook

The reason useFormStatus must be called in a component nested within the form comes down to React's Context API and how form
states are managed.

**1. Form Context in Next.js**: When a form is submitted, Next.js generates a special context for that form, which includes the
submission status, such as whether it is 'pending' or has completed the submission. The useFormStatus hook taps into this
context to read the form's status, such as pending.
**2. Context Propagation**: In React, context is only accessible by the components that are descendentas (i.e., nested inside)
of the provider that supplies the context. In the case of form submissions, the form acts as the "provider" of the status
context. The form "wraps" the components within it, and these components (it's children) can access the submission context
like peniding.
**3. useFormStatus relies on form context**: The useFormStatus hook relies on the form's context to know if the form is currently
submitting or not. If we try to call useFormStatus directly inside the form component, where the form is defined, not a
child of the form, there's no context available yet, as the context has not been 'created' or propagated
**4. Nesting Components**: The hook only works when called in components that are nested inside the form because that's where
the context is available
**5. Child Component Access**: To fix the error above, we move the call to useFormStatus into a child component (in this case
SubmitButton). Now, the form is rendered first, providing the context and then the child component can access the context
through useFormStatus

### End of FormStatus Hook

## 3 Benefit - Progressive Enhancement

By progressive enhancement, we mean that this will work even if there is not javascript on the client, if the JS fails to load,
so serverActions work even without js.
In the real world we want to have some client side logic in here, so we do need additional js and we will lose some of that
PE, 

more realistically, we coud have the form action like

<form action={async formData => {
  // Validate input data client-side and server-side; reset the form; 
  const { error } = await AddToDo();
  if(error) {
    console.log(error)
    return ;
  }
}}>

tipically we don't want to add the addTodo directly, like we had before, in an optimistic UI hook, we also need to invoke that
before we invoke the actual serverAction, practically speaking, we will need some client side js and we will lose some of
that pe, but we do have some pe anyway. This form will be prioritized with hydration, and it will be interactive before other
elements on the page.









