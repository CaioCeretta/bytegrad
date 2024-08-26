# 17 Reacts Best Practices

## Best Pratice No 1

The best practices number one is about hard coded values, so in the example we are going to make, let's take for example
the add to do form, and let's say we have this component AddToForm, and we have a form, which will have an input of the todo
and we may want to  monetize our app and disponibilize only 3 todos for a free user, then we add something like this

        if(todos.length === 3 && !isAuthenticated) {
          alert('You need to sign in to add more than 3 todos');
          return;
        }

  On the function submit, but here we are hard coding these values, the number 3, for example, and it may not scale properly
like for example, we created hundreds of more components that also need certain values like this, and this would not be a
good idea, and is a better practice to define these hardcoded values somewhere else that they're easier to manage.
  Because let's say we hardcoded the limit of 3 for free users, but later on, we decide that a free user should be able to
add 10 todos, and i'd like to change that, so now i have to remember where did i leave that number.
  When we hardcore these types of values, deeply inside our component tree, to manage all of that is a better practice to
define these constants, and define those outside of the code. Typically they are written in capital case, like 
const MAX_FREE_TODOS = 3 and use that variable instead of the actual hardcoded value on the code.
  We can simply add the constant in the same file, but by creating it and not passing this hard coded value, but it would
be even better if we added this into a dedicated file, together with all the hardcoded values we are going to use and create
a constants folder inside the src/lib folder, and now, if we want to change these values, we know where to find them.

then, after that, we could use it like

if(todos.length === MAX_FREE_TODOS && !isAuthenticated) {
  alert(`You need to sign in to add more than ${MAX_FREE_TODOS} todos`);
  return;
}

and reuse this constant we defined in a separate file, in other components

One other example, is, for example, if we want to check if the user is actually writing some sensitive words in their todos
such as password or credit card, if the user is typing some of these words, we can give a popup or a warning to the user

it would be something like

 if(
    todoContent.includes("password") ||
    todoContent.includes("credit card")
  ) {
    alert("Please do not use sensitive information")
    return;
  }

now we are hard coding these two strings, password and credit card, but what if we notice that users are leaking other
sensitive data, and we want to add more words, we might not know where we kept that list of sensitive words, and if would
be easier for us to manage it outside of the component, and that them to the constants

now we can simply manage by adding this constant export const SENSITIVE_WORDS = ["password", "credit card"]

and using it on the code we want. then it would  be, for example                              

if(
  SENSITIVE_WORDS.includes(todoContent)
) {
  alert("Please do not use sensitive information")
  return;
}

another example we can see about this is when we initialize the state from useState, and we want to keep track of the todos
which is a piece of data we want to keep track overtime, and we want to add some initialToDos, some people may often define
them like const initialTodos = [
  {
    id: 1, 
    content: "To do 1",
    completed: false
  },
  {
    ...
  }
]

  I can use that to initialize the state, but sometimes we have arrays and objects that we want to define somewhere, we
could to it on the component, but it may look messy, it's not a huge problem, but it's going to be recreated in every
render, so every array or object that we write on the component, will be recreated when the page re-renders, on a small
array like that, it would not be a problen, but in bigger arrays or objects we could have a performance issue.
  And if we use, an array or object as a dependency on a useEffect, since we are going to recreate that object or array
in every render, it's going to be different every render, so as a dependency, it will not behave as we want, because if
it's a dependency and it's different, it's going to retrigger a run of the useEffect, for example, and tipically, when we
define these constants for arrays or object, we tipically also wanna do it outside the component and maybe also in a constanst
file.
  In this example, the instructor kinda like if it's close to where we use useState, but is more subjective.







