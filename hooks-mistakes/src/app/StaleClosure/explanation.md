# useState / useEffect "Mistake" nº 11: Stale Closures,

In this example we will use a counter component

We're creating a count state that starts at 0, so far so good, and every one second we want to increment the count to 1,
and we are only doing it when the component first mounts

  useEffect(() => {

    setInterval(() => {
      console.log("Interval function running...")

      setCount(count + 1)
    }, 1000)
  }, [])

at first glimpse it is ok, but we are going to see if we enters the page, that the number has increased once, and it stays
there, but the console.log keeps on running, so every second this function is indeed running, but the count, for some reason
it stays at 1.

This happens because of closures in js, so on the component global scope, we have the count state, when it initially mounts
it is 0, and then we run the useEffect, where this whole function will run when the component mounts, in this useEffect
we are setting up this interval function and this function will run at every one second, so far so good.
Javascript will not recreate the function, it will create this function once with the state value that count had when it
first rendered, so it would always go from 0 to 1, but the interval is still running.

This is classed closures. By using stale values like the count, for the interval to sum + 1, it won't work. Then we might
think, "Oh, okay, so we just need to use the count variable as a dependency for the useEffect", then do it like this

useEffect(() => {

    setInterval(() => {
      console.log("Interval function running...")

      setCount(count + 1)
    }, 1000)
  }, [counte])

now, the interval will run and we'll have the correct value, now we it's running and we are having the current value,
it sounds correct, but what is happening here, is that we are not cleaning the previous interval, so we are adding a
new interval every second when the count changes and this will cause the count to start to get a bit glitchy, because
we are not cleaning this interval.

We need to create a new interval and we also need to cancel the previous one, setInterval returns an identifier and then
we return from the useEffect a clear interval for this useEffect, what is returned at the end of an useEffect, is called
a cleanup function, because it runs when the component unmounts, and before running the next useEffect call, so basically
we are able to clean up something from the previous useEffect, so it will now be


useEffect(() => {

    const countInterval = setInterval(() => {
      console.log("Interval function running...")

      setCount(count + 1)
    }, 1000)

    return () => {
      clearInterval(countInterval)
    }
  }, [count])

Now this seems to work just fine and we are not getting any strange effects, but there is another cleaner solution than this
we can simply create this interval on the component mount, but now, instead of using count + 1 we use a function state update
which would be setCount(prev => prev + 1), this is taking the previous value from that state and adding 1 to the latest
value. Functions that need the previous value, should always be function state updates