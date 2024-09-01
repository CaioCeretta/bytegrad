# 9th Practice - Naming props (when prop is a function)

# Example1

In naming props, people tend to stick to the convention we have in html, or jsx, so if we have a button element on the page
and we have a click event, we have an onClick, then it would be something like

<button onClick={handleClick} />
<input onChange={handleChange} />

In these examples, onClick and onChange are native browser events. When creating a custom component, such as AddToDoForm, adding a todo can be seen as an event that occurs within the component. To reflect this, we might want to expose a prop called onAddToDo.

When designing a component, it's important to consider how others will use it and what kind of prop names make sense. For example, if we want the user of the component to know that an addTodo event is happening, and if they want to interact with that event, they can pass a function to the onAddToDo prop.

Typically, we name the handler function handleAddTodo and pass it to the onAddToDo prop. The handler function is executed in response to a user interaction, and the prop name indicates that it's related to the addTodo event. The component itself doesn’t need to know what will happen when the form is submitted; it only needs to know that an addTodo event will occur. This approach results in a cleaner structure, even though the handler function could be included inside the component.

It's crucial to remember that each function should do only one thing. When thinking about a component in isolation from the rest of the app, we should ask: "What kind of prop should I expose here?" In this scenario, we want to signal to the user of the component that there is an addTodo event they can hook into. This approach aligns well with how typical JSX or HTML is structured.

# Example 2

This button component we're reusing which has its default styles but if the buttonType is secondary, there are going to
be some additional styles, such as opacity and size of the text.

In this case, we are setting both the log in and the register buttons as secondary, and it works perfectly fine for our case.

Now, for example, if i click on login, something different from the register should happen, to make it and for it to
function properly we are going to do as follows inside the button component we will have an onClick, and if we make it
the onClick as a default on the Button, it will always take us to login, and we do not want that, we want the function, which
will be called, to be defined by the parent.

The reason for it, it that we're making it too complicated, too specific, to one specific use case, the login. Imagine we are
designing this component and we know that we are going to use it in multiple places and for multiple use cases, so instead
of doing this way.

We'll now expose an event, which is going to be the clickEvent, just like we had todoEvents above, we are going to have
the onClick and we are going to "tell" to the person that is using this component that there is a click event that is going
to happen in this component and he can hook into that, so on the Button component we will receive a onClick prop, which will
be a function, doesn't matter what is going to be, we'll just invoke it onClick. Now this component is more dumb, it's not
complicated anymore, it's a simple one, and if now we want to call the login on the click, we have to specify the function
which will be executed. And the component does not need to know anythhing about login or register, or whatever function.

So keep in mind that when we are making a component, try to make it, specially lower in your component tree or if they are
meant to be reusable, like a button component, or whatever, to don't make it very specific for one use case, try to make it
more general, simpler, and we can do that by exposing certain props, so then when we actually use that component, we can then
specify the particular use case.

In terms of naming the props, we can think sort of when we emit an event, or sort of exposing the click event, so when we
actually use that component, we can hook into that; in this case we are exposing a click event so we named onClick, in the
case that the component would add a todo, it will have a onAddTo event, similar to the click name.

