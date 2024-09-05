# 17 practice - Improve overall structure with components, custom hooks and utility functions

We might get big very messy components, and it'll be difficult to read once in a while, so let's say the TodoList component

In the same component we have the state, the useEffect for the storage, then we are going to have some markup, for example
if there are not any todos here, we are going to show a particular screen, then we have the return we will have the todo
list. Then, still inside the component, we are going to hbave buttons to reset or mark all as complete.
Here we are breaking several rules, so to make it better, we will do as follows.

First of all, do not be afraid of creating new components, even if we are not reusing them, components are going to clean
up a lot of the code in our file, so if we have a bunch of markup we need to see if we can define it in smaller components.

Otimization No1: 

Let's start by creating a StartScreen component and use something like

{todos.length === 0 ? <StartScreen /> && null}

then on the StartScreen component would be the text we had on the file, and this little piece is still going to look cleaner
and it's even cleaner, because with the name of the component, we know for what it is about, so we will end up labelling
this markup and taking less space from the code.

Optimization No2:
Now we are going to reduce the markup for this list, we have a bunch of code for each todo, and it actually makes sense
for us to have a todo item component, where will create a component for each todo and place it the whole markup into it

{sortedItems.map((item) => (
        <TodoItem
          key={item.id}
          todo={item}
          onDeleteTodo={onDeleteTodo}
          onToggleTodo={onToggleTodo}
        />
      ))}

then we simply pass that todo as prop to the single component using a map.

Optimization No3

We can see that there is another "independent" piece of that component, which is the toDo delete button, so we are going
to create a separate component for the buttons, to turn the todos list even smaller and make it even clearer what that
piece of code is doing

Optimization No4

Let's say the user created a todo with lower case letter but we wanted to capitalize it, let's say that on the todo component
we have something as

<span className={`${todo.completed ? "line-through text-[#ccc]"} >
  {todo.content.charAt[0].toUpperCase() + todo.content.slice(1)}
</span>

and we can create a util function to handle this method to shrink even more the code

and it is going to be

<span className={`${todo.completed ? "line-through text-[#ccc]"} >
  {capitalizeFirstLetter(todo.content)}
</span>

So this logic is cleaner and more reusable in our project.

Optimization No 5

Here we are utilizing the SideBar buttons, but we can create a single button component for each one of them
       
