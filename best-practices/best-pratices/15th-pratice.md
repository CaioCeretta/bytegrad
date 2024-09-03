# 15 Practice - Don't add multiple concerns to the same useEffect

useEffect is a pretty straight forward hook, when we call this call function we specify two things, the function we want to run
and the dependencies which will cause it to run again, if it's empty it'll run only once.

Normally we use it to synchronize our react app with something that is outside, such as db, localstorage, and so on.

We can use local storage, for storing things in the user's browser in local storage, so what we may want is that when
the user add more todos, completes them, deletes them, what we want to do is to persist that in localStorage, then when
the user shuts down and opens the page again, their todos are still going to be there.

Local Storage is something outside my react app, different from hooks, that are inside the app. Some things like local storage
are in the browser, react team does not have control over.

So that is tipically for what we want to use the useEffect hook for, for things that are outside our react app. So in this case
we may have our todos state, with all sort of todos, and we want to make sure they're saved in local storage, so we will do
as follows.

useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

whenever anything on the todo change, the useEffect will run again and update the storage

fetch would be other example of uses for useEffect, for us to synchronize data, populate states, and so on.

The best practices for useEffect are basically, that we want to make sure that each useEffect instance takes care of one
purpose, for example the user selects a todo and press the escape key, we want to delete it. we want to set something in the
DOM, the window object or the DOM, that is actually something that is outside of our react app, these things are coming from
the browser, so we may also want to use `useEffect` for that so besides setting the local storage item, we will do something
like

useEffect(() => {
  localStorage.setItem("todos", JSON.stringify(todos))

  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      // Delete todo
    };
  }
  
  document.addEventListener("keydown", handleEscapeKey);


}, [todos])

  we are putting the two functionalities in the same useEffect, so it will get confuse because this useEffect depends on
   the todos.

  That means that right now when the todos change we are adding that eventListener to the document, even though it has
  nothing to do with the todos. This means that whenever we delete one, add one, complete one, the function and the event
  listener will be created again. So istead of doing it like this, we should create two separate useEffects as follows.

  useEffect(() => {
  const handleEscapeKey = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      // Delete todo
    };
  }

  document.addEventListener("keydown", handleEscapeKey);

  }, [])


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])