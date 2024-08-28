# 7th practice - Keep the components dumb

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




where progressPercentage is going to be a prop received, then  if i want to use it somewhere else, for example. in a loading indicator





