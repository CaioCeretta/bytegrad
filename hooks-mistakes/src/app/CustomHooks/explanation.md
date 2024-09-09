# useState / useEffect "Mistake" nº 8 - Not using custom hooks

React developers seem to be a little confused or scared to usom custom hooks, so as an example

we will work on a file that has two components, we can have multiple in the same file, that's not a problem, so let's say
the first component needs to know the width of the window, so we will store that in a state,

then we will keep track of it in a useEffect, that will initially when the component first mounts

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setWindowSize(window.innerWidth)
    }

    window.addEventListener("resize", handleWindowSizeChange)

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange)
    }
  }, [])

  like this, and when this component unmounts, by we closing the tab, or navigating away, this event listener will still
  be attached, so we need to remove that when this component is not being used, so we can return something from the useEffect,
  which will run when the component unmounts.

Now, in the example. let's sat that the second component wants to know about and also wants this code, instead of duplicating
all of these codes in other components.

We will utilize the D.R.Y principlie (Don't repeat yourself), because this is a good candidate for refactoring it to something
that is a little bit more reusable, so we should create a custom hook for this function, and it would be something as

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(1920)

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setWindowSize(window.innerWidth)
    }

    window.addEventListener("resize", handleWindowSizeChange)

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange)
    }
  }, [])

  return windowResize
}

For custom hooks, tipically their name start with the word use, to indicate that we will have react hooks in it.

Now, on the components we need this function, we just call the useWindowSize()

So, in summary, what happens here is we are refactoring the code to create a customHook that can be reused accross multiple
components. The purpose of the hook is to track and update the window width whenever the browser window is resized

The useEffect hook ensures that the event listener is added once when the component mounts.This event will update the value
of current width every time the window is resized. When the component unmounts, or the page is left, the useEffect clean
up function removes the listener to avoid memory leaks