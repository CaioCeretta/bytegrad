# 7th practice - Keep the components dumb

## Example 1

So essentially, what this means is for us to keep the components simple. Let's say that in our case we have a status bar
at the top, and we have the todo

We could do, for example, have a hardcoded number, like 50%, then the bar would always be at the middle. 

But it would be better if, we could create a progress bar, where we would keep track of the total of todos, the number
of completed ones, and track by it, the example would be

width: `${
          (todos.filter(todo => todo.completed).length / todos.length * 100)
        }%`
reminder, the filter will give us a new array, and in this case, only the completed ones.

Here we are not making the component simple, we are actually doing some pretty complicated calculation in here. It will
actually work as expected but this is not really good component design, because in order to make this calculation we need
access to all the todos and we need to pass down all the todos as a prop to the StatusBar component, in order to make this
calculation, which is not so good.

Let's say we want to use this statusBar for when we are loading data, or, for example, when we are transition pages and we
want to show a loading indicator when we are transitioning to other page, so in the way we designed this component where
we are doing the calculations only based on the todos, it will always use this todos variable and the width depends on the
calculation we created for the todos.


## Solution

So what we want to do is, if we have a calculation like this, we don't want to do it inside the component, what we actually
want to do is do the calculation outside the tag, higher up in our component tree, and we just want to use this component
by passing the percentage. so the original component is

import { TodoType } from "../lib/types";

type StatusBarProps = {
  todos: TodoType[]
}

```
export default function StatusBar({todos}: StatusBarProps) {
  return (
    <div
      style={{
        width: `${
          (todos.filter(todo => todo.completed).length / todos.length * 100)
        }%`
      }}

      className="h-[10px] bg-orange absolute top-0 left-0"
    />

    
  )
}
```

but what we want to do is do the calculation outside the component, we just want to use it to track progress, so it would be
something like


type StatusBarProps = {
  progressPercentage: number
}

```
export default function StatusBar({progressPercentage}: StatusBarProps) {
  return (
    <div
      style={{
        width: `${
          progressPercentage
        }%`
      }}

      className="h-[10px] bg-orange absolute top-0 left-0"
    />

    
  )
}
```

and when we call this component, we will do the calculation outside of it, and pass to the component.

And now it's more "agnostic" to a particular use case and it's more general now.

So we could, for example, utilize in the app tsx, where everything is going to be loaded. Inside this component we would
have the calclation and just pass to the status bar, in the end it would be something like

```
 
    <div
      style={{
        width: `${
          progressPercentage
        }%`
      }}

      className="h-[10px] bg-[orange] absolute top-0 left-0"
    />
    ...

then on the app component we would do it like


  const todosCompletedPercentage = todos.length
    ? (todos.filter((todo) => todo.completed).length / todos.length) * 100
    : 0; // Ensure no division by zero

<StatusBar progressPercentage={todosCompletedPercentage} />

Now this component is "dumber", not an insult or anything, it's just not as complicated as before, because if we have a
very complicated thing it is usually very specific for a use case.

So don't forget

### Keep your components dumb they are not unnecessarily complicated they are simple as they can be, and it will improve
their reusability

And if we have on top the todos state, and use the calculation with that state, it is essentially being derived from some
exsting state that we already have. People call that derived state, tipically what we wanna derive is vert close from where
we actually have the original state, instead of somewhere down our component tree, we want to do very close to where the
actual state is, something like

  const [todos, setTodos] = useState([]);

  const todosCompletedPercentage = todos.length
    ? (todos.filter((todo) => todo.completed).length / todos.length) * 100
    : 0; // Ensure no division by zero


## Example 2 - Children Pattern

There are other situations where we are managing the state and when i submit the form, i want to add it to the array of todos
so me may think of setting the todos somewhere in the form, and that form is sitting on the sidebar component

So in this example we are not using the store for the todos, but we are creating that todos state inside the app, and on the
sidebar creation, we are passing the setTodo state to it, but it would be a prop drilling in this case, so to get that
setter function, all the way from where we are managing the state, all the way down from the component tree to the component
that actually needs it, we have to go from one in between the component, which is the sidebar, it stands in the middle of
the app and the todoform, so the sole purpose of the settodos sidebarprops, is to pass it down, and this is not ideal,
because for making this component more complicated that it needs to be, because it will need a chain, from app to the sidebar
to de the addtodoform, and for us to add a new component in between them we have to make sure that we also pass the setter to that
and if we don't, we break the chain, and it will become more like a fragile set up, so we are, in this case, unnecessary
making this component more complicated than it should be.
We can prevent prop drilling in several ways, so people will always opt to use other solutions for state managenement, such
as contexts,redux, stores, etc...
One easier way for smaller cases, its just we remove that setTodos from the sidebar, not self close the component, and inside
of it, take the whole code from the sidebar, and place it inside of it, as children.

<Sidebar>
  <AddTodoForm addTodo={addTodo} />

  <div className="space-y-2">
    <Button type="button" buttonType="primary" className="my-2" onClick={() => { }} key={'log out'} text="Register" />
  </div>

</Sidebar>

this is another option to prevent the prop drilling effect, and it may be nice for smaller apps, and one down side of this
approach is that the app component will blow up, since pratically all components are going to be inside of it and it may be
harder for us to see what's going on. Children partner may sometimes be ok for us. One other good thing for this pattern
is that, for example, if we have 3 components inside of it, and we need to rerender the sidebar component, it will not cause
a rerender for the components inside of it.
One other option is by using the context api to deal with the states, and one more thing, we also may prefer the functional
way of dealing with the state updates, like setTodos(prev => [...prev, todo])

this way we keep the integrity of the data utilizing the previous state, and add a new one of handleAddTodo, then we are going
to migrate the functionality of the handleSubmit, of adding a todo, to this function

because this component does not need to know anything about modals, we want to keep this components dumb, they shouldn't know
about all sorts of different things.

So basically, to finish this topic

Let's say we have the sidebar component, which is like the way above, on the component the content is just children, and when
we call the Component, inside the opening and closing we have the jsx. Inside of it we have the AddToDOForm, which will
update the app state todos, and what we would first think is about passing down the state setter as props, it will work,
but it will make the component unnecessarily complicated, we don't actually need the todos there, because in the react useState
there is another way of updating states, which is with a function, if we are receiving the setTodos, and using it, we are
going to be able to access the current state value.
