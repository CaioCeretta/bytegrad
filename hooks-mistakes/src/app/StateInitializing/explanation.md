# useState / useEffect "Mistake" nº 6: Initializing state with an object

If we, for example, use the useEffect without a dependency array, only [], which means that it will run the useEffect
only once when the component mounts, when the component mounts it will fetch the post, eventually it will get a response,
convert it to json, then to a normal js, then update the state. This fetch sometimes can take multiple seconds, but here
we are already rendering the post.title and the post.body, so if we save and open the page, we will initially get an error
we are going to see that it's trying to read properties of undefined

This happens because on the state creation, we haven't specified the post object initial value. And immediately, we are not
going to be able to pass those informations to the component.

So we need to remember, useEffect runs after the rendering, so at first, we try to render that on the page and after that
useEffect runs, and while we are waiting that to finish, we are already trying to display its values on the screen.

One of the ways we can do this is by using optional chaining, so post?.title, then if we are trying to run something, it
won't throw an error, this way we won't get an error and it'll wait for the re render to display

Most of the times, people tend to initialize this with empty state or null. In JS if we want to explicitly mark something
as  non existent, we utilize the value of null, undefined is more like accidentally non existing, and null we are deliberately
initilializing it as null. Now even by removing the ? values, it'll still throw the error of unknown property

The cleaner solution for this, is in place of the optional rendering with ?, we simply are not rendering anything until
we have the data from the post, we can do it in two ways

## Option 1

First, we would create a loading state, start it as true, then on the on useEffect we would say something like

setPost(data), where we will pass the response data to that setPost, and afterwards setLoading(false), and on the component
return, we would say something like

<section>
  {loading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <p>{post.title}</p>
      <p>{post.body}</p>
    </div>
  )}
</section>

this will work because before the component was trying to render the post object before it was defined. Initially the post
is null, and without a conditional check, attempting to access post.title or post.body results in an error.
So by introducing loading state, we ensure that the component renders a loading message until the fetch operation completes.

## Option 2

Option two is a little more straight forward and better in my opinion, we wouldn't need another state, like the loading
one, and just add on the render like this

return (
    post ? (
      <article>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </article>
    ) : (
      <div>Loading Posts</div>
    )
  )

This would also work, by checking if there is a post. We must not forget to type the state object because otherwise the code
will show a red squigly line on the property, so it would be good, if we know what properties a post has to add something like

useState<{title: string, body: string}>() 

