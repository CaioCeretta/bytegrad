# useState / useEffect "Mistake" nº 5: Primites vs Non-Primitives

In this case we have a price state and a button component, when we click in that component, we run the handleClick wich will
set the price to 0.

We learned that if the state doesn't change, the component would not rerender, the price starts at 0, and the click sets
it to 0, so by consoling on the top of the component, when the component first mounts, it will show the message, and if we
click on the button, the component won't re-render and log anything because he see that its the same value when the click occurs.
That is true if we have a number, a string, a boolean, which means that it will be true for primitive values.
What if we are doing it with non primitive values? such as arrays or objects?

now if we start the state as {
    number: 100,
    totalPrice: true
  }

and on the click, we will set that state to the same object, we are now going to see that when we click on that button
the component will re-render. This happens because in JS there are primitive values, which we saw above, that they are
passed by values, and objects or arrays are non primitive, and this type of variables are passed by reference.
So if i have, for example, a variable a = 5 and b = 5, then strictly compare both of them with the triple equal, which will
match type and value, this will be true.
Now if we have a variable a = {hello: 1} and a b = {hello: 1} then strictly compare both of them, now it will return false.
This happens because in javascript, whatever we write like an object literal like that, he's not working with the objectg
itself, but working with a reference in the memory, a pointer, so he's not checking the value of the object or its properties.

We can think that objects are more like a box, we can have one box with the exact same content as another box, but they are
two different boxes. This is not true with primitive values, they are always the exact same, so we always work with their
exact value.

Basically what is happening is that when we are creating the object like {number: 100, totalPrice: true}, and then we compare
to another {number: 100, totalPrice: true} react will look into this and think: "Oh, you are passing something new here, and
this is different of what we had before" because it's a different object, and therefore react will re-render because it will
see that it's different.

In practice, this is mostly dangerous for cases where we have a dependency array, most commonly with useEffect.
We are going to run a useEffect function, and rerun whenever the dependency array changes, but if we are passing an object
as a dependency, we need to be careful, because everytime we update it, this object is going to change and trigger a re-render
so tipically we don't want to depend on an object but a primitive value, or we can depend on a object property, such as
price.number which will be now a primitive and prevent this useEffect from unnecessarilly running


There is one way we can still use the object as a dependency and still don't cause rerenders, which is useMemo
if we do something like

const memoizedPrice = useMemo(() => {number: 100, totalPrice: true}, [])
by doing this the object is memoized with a dependency array of [] that ensures the object is only created once when the
component mounts and will not change on re-renders

if we want the object to update based on certain state or props, we can include them on the dependency array, like

const memoizedPrice = useMemo(() => ({number, totalPrice}), [number, totalPrice])

In this case, the object will only be recreated if number or totalPrice changes, ensuring the object reference stays stable
unless one of the dependencies change

## Hard coded values on the memoized array explanation

If we utilize in the memo callback,  useMemo(() => ({ number: 100, totalPrice: true }), [number, totalPrice]);, by
including number and totalPrice in the dependency array, it might be a bit confusing

- Using hardcoded values with useMemo

  When use hardcoded (constants) values inde the useMemo callback like so

  const memoizedObject = useMemo(() => ({ number: 100, totalPrice: true }), [number, totalPrice]);

  Including number and totalPrice in the dependency array doesn't have any effect unless these are variables in our component
  scope that can change. if number and totalPrice are not variables but constants, as in this example, we should use an empty
  dependency array

  const memoizedObject = useMemo(() => ({ number: 100, totalPrice: true }), []);

  This ensures that the object is only created once, and its reference remains stable across re-renders.

- When to include variables in the dependency array

  1. They are variables in our component's scope: that is, they're state or props that can change over time
  2. They are used inside the useMemo callback. The memoized value depends on these variables

  For example, if number and totalPrice are state variables or props:

  const memoizedObject = useMemo(() => ({number, totalPrice}), [number, totalPrice])

  In the case above, the object { number, totalPrice } will be re-created whenever one of these variables change and including
  them in the array ensures that the memoization updates correctly when these values change.

So to avoid confusion, we should, if using constants, to use an empty dependency array and if we are using variables to
include them both in the useMemo callback and the dependency array

Example: 

const [number, setNumber] = useState(100);
const [totalPrice, setTotalPrice] = useState(true);

and if we want the memoized value to use these values

const memoizedObject = useMemo(() => ({ number, totalPrice }), [number, totalPrice]);




