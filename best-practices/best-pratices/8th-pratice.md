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
before that