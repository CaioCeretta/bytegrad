# 10th practice - useMemo, use Callback & React.memo for perfomance


## useMemo 
In this practice we'll be talking about memoization, and functions which utilize it, so we can improve the performance
of the app

Initially, let's use the todos state for example, so everytime this todos component changes, it will rerender the whole
component, and therefore, all the statements inside this component, such as functions, expensive calculations, computations
etc, are also going to execute again, so we need to be careful about that.

So let's start talking about the todosCompletePercentage calculation

```
  const todosCompletedPercentage = todos.length
    ? (todos.filter((todo) => todo.completed).length / todos.length) * 100
    : 0; // Ensure no division by zero
```

this is a function that we may not want to run everytime the component re-renders, so useMemo will be a good option for
this case. useMemo is a function that receives two parameters, the first one is a callback function and the second one is
an array of dependencies which are variables that if their values update, will make this calculation again, it will be as
follows.

```
  const todosCompletedPercentage = useMemo(() => {
    return todos.length ? (todos.filter((todo) => todo.completed).length / todos.length) * 100 : 0; // Ensure no division by zero
  }, [todos])
```

This will cause the component to not run on every render, let's say for example, we have two differnet states, one for todos
and other for the todo content, if the todoContent state changes it will rerender everything and execute this calculation
again, so if we set the todos as a dependency, the content state change will not affect this calculation.

So useMemo is often used for calculations like this, very often like derived state which is something we derive from existing
state like the todos, for example, so we want to be a little careful with that and we can wrap it in a useMemo.

One other thing we can do with useMemo is utilize it for objects.

If we have an object or an array, and we using it as a prop to another component, since they will be recreated every time
this component renders, its children which receives this prop, will also rerender, so if we utilize the useMemo on these
objects, it will prevent those from being recreating



## useCallback

Everytime this function component is rendered, a new function handleAddTodo is created and assigned to this variable which
we will now pass down here, so just as we saw for calculations with useMemo, we can do the same with functions, if we don't
want to recreate it everytime, we can wrap this in a useCallback hook and choose when we want to recreate it, so we can do it like this

```
const handleAddTodo = useCallback((todoContent) => {
  // basic validation
  if (!todoContent) {
    alert("Item can't be empty");
    return;
  }

  setTodos(prevTodos => [
    ...prevTodos,
    { id: prevTodos.length + 1, content: todoContent, completed: false }
  ]);
}, []);
```

if we do it like this, we are going to prevent the function to being recreated on every render.

One other benefit of the userCallback is that the form components which receives the onAddTodo, it was always receiving
a new prop, but now that is wrapper in a useCallback, it won't be a different function, most of the times is going to be
the same function, and what we can do now, is preventing that component to rerender, because the prop it will receive
will be the same, and in the case, we can use react memo.

so, use callback is very similar to useMemo but just for functions, it means that the functions won't be needlessly recreated
if its dependencies don't change. One other benefit is that if we pass an object, an array or a function to another component
if we wrap that in React.memo, props will stay the same because they have been cached, either by use callback or useMemo.
If the prop is cached by useCallback or useMemo, it will be the same prop and react.memo in that case will prevent a re-render
from that component.

# Memo

Now, we will wrap the addToDoForm in that memo function, since the property won't likely change, to do this, we must
not forget to transform that function into a constant, so it will go from export default function addTodoForm({ addTodo })
to const addTodoForm = memo(({addTodoForm}: AddTodoFormProps) => {
  ...
})

or const addTodoForm = memo(function ({addTodoForm}: AddTodoFormProps) {
  ...
})

now this component will not rerender because it is cached, and this is only possible because the function we are passing
as props, is now memoized and won't be recreated all the time. So we can essentially wrap the whole component on memo in
this cases.

In a nutshell that is how the memoization work, it improves performance by avoiding unnecessary re-renders, so React.memo
in conjunction with useCallback or useMemo is very useful




