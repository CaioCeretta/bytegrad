# # useState / useEffect "Mistake" nº 12 - Fetching in useState 

Here we're talking about why we shouldn't do fetching in useEffect in the real word.

Here i have a Post component, it's just showing us a button, keeping track of the id state and also calls the PostBody
component

PostBody is another component that has a text state and is going to output that text which is currently empty

SO we have two components and one file, and that's fine.

So we have that state id and we want to pass that to the PostBody and based on that id the PostBody will fetch that text.

Now beginners would do it like


useEffect(() => {
  fetch(`https://dummyjson.com/posts/${id}`)
  .then(res => res.json())
  .then(data => setText(data.body))
}, [id])

so here it will fetch the post with the id of 1 and show it on the page. it will work just fine

Now what we want to do is, when we click on the button, we want to fetch a new post.

So when we save this, the PostBody component will be mounted, and the useEffect will run once, and execute a fetch based on the id
So far so good, then we now have

<button
  onClick={() => setId(Math.ceil(Math.random() * 100))}
  className="bg-blue-500 px-4 py-2 text-white rounded mr-2">
  Show me a different post
</button>

<PostBody id={id} />

If we do it like this, the component will re-render when the button is clicked, because the id is being changed so the useEffect
will run both when the component is mounted but also the id changes, now when we click there, we will see everytime a
new post, so far so good.

In the real world, though, if we want to make it more professional, we need to think about the edge cases as well.
What if we click multiple times in that button, it sort of flashes through the posts. What happens is, everytime we click
the id gets changed, it is going to fire a fetch call, so if we quickly click five times, the fetch will occur five times,
eventually it'll get the data and try to set the text state.

This is really not the UI experience the user wants to have, so we want to cancel previous fetch calls when many happens
concurrently, browsers gives us the option

  useEffect(() => {
    const controller = new AbortController()

    fetch(`https://dummyjson.com/posts/${id}`, {
      signal: controller.signal
    })
      .then(res => res.json())
      .then(data => setText(data.body))

      return () => controller.abort()
  }, [id])

  by doing that controller abort on the useEffect clean up, so before we run it, we will run the clean up function, which will
  allow us to abort the previous fetch calls, and now, on the code, we will see that there wont have any glitches when we
  start clicking it multiple times, we will only see the last click. If we don't add this, the fetches are simply going
  to race against each other to see who will render first.

