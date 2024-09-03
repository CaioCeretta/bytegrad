# 13th Practice - Keep track of an 'active' or 'selected' item by its id, don't duplice the whole object

One other best practice for state, let's say we have our todos, which is going to be an array, and initially maybe an
empty one, or we may have some default todos in there, for example

const [todos, setTodos] = useState([
  {
    id: 1,
    text: 'Learn React',
    completed: false
  },
  {
    id: 2,
    text: 'Learn TypeScript',
    completed: false
  },
  {
    id: 3,
    text: 'Build a project',
    completed: false
  }
])

very often we have a list of something and in here we are actually not using that, but let's say you can click on one of
the items in the list to make it active or select it, we click on top of it and invoke an onchance func, and that is a piece
of state we want to keep track of, and we cannot derive it from the todos, so tipically also wanna keep track of that

so we'll do something as

const [selectedTodo, setSelectedTodo] = useState(null)

the issue here is now that when i click on the todo, that means that the first todo needs to become the selected one, and
what some people would do is that they will take the entire todo and make that as the selectedTodo state, so they will 
invoke the setter function and they will set it literally as the entire todo, so for example, the selectedTodo is going to be
the
  {
    id: 1,
    text: 'Learn React',
    completed: false
  }

So now the selectedToDo is an object with the same information as the object on the other state, and this is a bad practice
because if we change the todo, like for example, if we change the text from it and change learn react to learn next.js

What we're telling here is that if we change the content of that todo, the selectedTodo, is meant to be the same as that
todo, but this is no automatically updated when i update the other state, this is because we have now two sources of truth, in
programming is very important that, if it's possible, that we have only one source of truth

Source of truth, in programming refers to the authoritative data source, that hold the true and definitive version of a particular
piece of information. It's the single source from which all other representations, copiess, or states of that data are derived.

And in this case, i'm trying to keep track of the same thing in two different places, and so when i update one of those two
the other one is out of sync, so then we have to remember to update in the two places, even though is quite easy to forget
about that.

Doing like this is a very error prone structure, and that's not what we want to do, we don't want to keep track of a selected
item or an active item with by sort of duplicating the object or array, like this, instead, we want to keep track of it by ID.

A better way for us to reach the same results, would be changing that selectedTodo state to a selectedTodoId state, and if we
click on the first one to be active, we just store the id of that todo, so if the todo with the id 1 is changed, that will
not be an issue, because we are still pointing to the same object, so whenever it changes now it's okay, because we are still
pointing to the same object.

If we want the whole object, we can derive it, we can just take all of the todos, and find the todo with a simple filter
such as

const selectedTodo = todos.find((todo) => todo.id === selectedTodo.id)

now we have only one source of truth, and whenever it changes it's ok, because the only thing we are keeping track is the id




