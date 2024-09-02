# 11th Practice - Use the updater function for setting state when the new state depends on the previous state

For setting state, we essentially have two options, just set it to some value but if the new value depends on some previous
one, it's probably better to prefer the updater function format, so in this case, for setTodos, when we add a new one for example
we want to keep the previous ones, and we'll use setTodos(prev => [...prev, {id: 1, text: 'any todo', completed: false}])

## Closures

Closures are important when dealing with functions that have access to variables from an outer scope.

A closure is formed when a function is defined inside another functio and the inner function references variables from
the outer function's scope. The inner function "Closes over" these variables, meaning it retains access to them even after
the outer function has finished executing.
_________________________________________________________//____________________________________________________________

Let's use a count state for this example

let's say we have:

const [count, setCount] = useState(0)

then we want to increment this component count by one every time this component mounts, so we would do it like

useEffect(() => {
  setInterval(() => {
    console.log('Interval function running...)
    setCount(count + 1)
  }, 1000)
}, [])

By doing it like this, it would not increase at each second, but if we check the dev tools, we will see that the console log
is running, but the count is remaining the same, as 1.

This has to do with closures in js, initially the count is 0, and the first time it mounts, we are going to run the useEffect
and this whole function will run once, and we'll run the useEffect again, and it will run the setInterval again, but basically
this function will run every one second, and javascript will not recreate the function every one second, it will create once
and then execute the same function every one second. In js, if we use variables, like count, those are created at function
creation time, and by the time the function is executed, the count is 0, as we defined in the useState.
This a common mistake, this is called closure, the variable is getting the value in function creation time, so we need to make
sure that every one second the whole function is destroyed and then recreated, and in the new creation of this function, we will
get the new value
Now, let's set the count as a dependency for the useEffect, everytime the count changes the state updates and the function
is recreated. SO initially it will be 0, it will run one time, change to 1 and do the useEffect again, and so on, even though
it seems correct, a new interval is being created all the time and the last one is not being stopped, so we need to create
a new interval and also, interrupt the last one.
Set interval returns an identifier for we to keep track, so we will assign this identifier to a variable like
const countInterval = setInterval(...).
useEffect, also has a cleanup function, so if we return a function like

return () => {
  clearInterval(countInterval)
}

this useEffect clean up function is going to be called everytime the component unmounts, but also runs before running
the next useEffect call. By doing that, we do not have to worry about using the count as a dependency, because this interval
we keep on running without a new one being created on every mount, so by using

useEffect(() => {
  const countInterval = setInterval(() => {
    console.log('Interval function running...');
    setCount(prevCount => prevCount + 1);
  }, 1000);

  return () => clearInterval(countInterval);
}, []);

we won't have a problem..

The key idea is that closures capture the variables at the time of the function's creation. When dealing with state updates
in React, using a stale closure can lead to unexpected behavior. The solutions provided ensure that the interval function
has access to the most up-to-date count value each time it runs, avoiding the problem you described.

### Closure Example using Ref


We can use both useState and useRef with the same variable.

useState is used to store state and trigger re-renders when the state changes. In the count example, it allows the component
to display the current value of 'count' and update it every second

useRef is used to store a mutable reference to the current value of count that persists across renders without causing
re-render when updated. `useRef` is useful for accessing the latest state inside callbacks or other functions that are
not re-created on every render, like setInterval.

How they work together:

State Update:
  . `useState` hook manages the count value and setCount is used to updated this value when setCount is called, the component
  re renders with the new count value
  . the `useRef` hook is used to keep a reference to the most recent count value. After every render, an effect updates
  countRef.current with the latest count value

useEffect(() => {
  countRef.current = count
})

the interval function uses countRef.current to access the latest value of count, without needing to rely on the state
closure. This ensures that the correct count value is incremented each timer the interval runs.

the useEffect hook that sets up the interval has an empty dependency array [], so it runs only once on mount, meaning
the interval function doesn't get recreated on every render, an example recap will be: 

const [count, setCount] = useState(0)
const countRef = useRef(count)

useEffect(() => {
  countRef.current = count;
})

useEffect(() => {
  const countInterval = setInterval(() => {
    console.log('Interval function running...');
    setCount(countRef.current + 1);
  }, 1000);

  return () => clearInterval(countInterval);
}, []);


WHy use this approach?

  . Avoiding re-renders: 'useRef doesn't trigger re-renders, which is why it's used to store the count without affecting
  performance
  . Accessing the latest value: the interval function can access the most recent count value with needing to be recreated,
  avoiding stale closures and ensuring correct updates.

This approach is particularly useful when you need to access the latest state inside a callback or an effect without
triggering unnecessary re-renders

### End of closures explanation

By continuing the counter example from the instructor, he was saying basically what i just said and i'll go from here.
If we were to utilize the setCount(count + 1) multiple times on the sameRender, like three times setCount(count + 1)
the three of them would ve 1, because since it was not rendered again, the state count value will be the same and it will
not work as expected.

and with
setCount(prev => prev + 1);
setCount(prev => prev + 1);
setCount(prev => prev + 1);

this would be the same case, it will always be one

So everytime we depend on the previous value, we need to update the state by  an "updater function" or "functional updater"
this approach is used to update the state based on its previous value





