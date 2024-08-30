# 8th Practice - Don't use setter function from useState, instead create a seperate handler function

Very often when some event occurs, such as submitting a form, we want to do multiple things, in the To do case handle submit
we want to add the todo to the state, and there are maybe other thinkgs we want to do, like, if we have a modal and we want
to show a message to the user, after he added the todo, informing him that he reached his free limit of creating todos, so 
let's say we have a modalContent state, and we want to update that state, by saying something like "You have now added
{todos.length} todos. Please upgrade your plan to pro
So in the handleSubmit we would to setTodos(prev => ...) and below it, on the same function

if(todos.length === 10) {
  setModalContent(
    `You have now added ${todos.length} todos. Please upgrade to Pro to add more.
  )

  setIsModalOpen(true)
}

so very often we want to do multiple things and have different logics in the same place, so let's say we have a function
before that, so we would end up doing something like

    if(todos.length > 10) {
    setModalCOntent(`You have now added ${todos.length}, please upgrade your plan to pro to add more`)

    setIsModalOpen(true)
    }

the first problem here is that we need access to the todo variables, we got it in the last case by using the previous
value from the setter, and it would become very complex, because we would also need access to the setter function and also
we also we need access to the setter of the modal, and this component suddenly is going to become more complex, because
now we need to pass a todos variable and also an additional setter function.

Tipically we don't want to pass raw setter functions if there isn't an event happening on that component, and we wanna do
something on it, so we may want to create handler that encompasses all the things we want to do.

So one good options to it, is create different handlers that are going to handle different logics, so we would create a 
handleAddTodo, which will add a todo, and simply on the onSubmit, call that function.

What we are doing in this practice, is that on the app, where we have access to the todos, we are defining that handleAddTodo
and passing it as props to the addtodoform, and that addtodoform, is going to call the function it received as a prop on
the submit, which will make the addtoform, a dumber component and it is much more easy to analyze, so in order to do
this, the only thing the addToForm does, is call that function passing that todoContent as an argument, then, on the app
we have the handleAttToDo, which has the parameter of the content, and it will work as usual


  