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

## New Way

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


## Backend

. Old way - without server actions (api route)

Traditionally, we would have to submit this to the API endpoint, we have created an API endpoint which is the /api/todos
in NodeJS we would use something like express. In NextJS we will have an api route, such ass

app/api/todos/route.ts 

And we could absolutely still do it like this, there are some exceptions, but then we would have our route and here in
NextJS we would have to do it like this, we are exporting a POST function here, we grab the request, we grab the content,
parse it as JSON to create the actual todo item in our database and then we can return some NextResponse.

. New Way - with server actions

here we have this addTodo function which is called on action={addTodo}

Here on the action file at the top will have 'use server', that is saying that this function is only going being executed 
in the server, and it's just an async js function, it takes a formData as argument, nextJs will make sure we got access to
that formData automatically.

Different from the old way, where the form was controlled, we had to use useState to keep track of the inputs, onChange
to update the state,  then on the route we would have access from the variable being sent by the request, and so on.

On this new case, we don't have to do it anymore, we can simply add the function to the action, then on the function use
the formData as parameter, nextJS will do the trick and we'll have access to all the inputs, then we just return a normal
js to the user.




