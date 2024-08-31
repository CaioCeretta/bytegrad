# 9th Practice - Naming props (when prop is a function)

# Example1

In naming props, people tend to stick to the convention we have in html, or jsx, so if we have a button element on the page
and we have a click event, we have an onClick, then it would be something like

<button onClick={handleClick} />
<input onChange={handleChange} />

In these examples, onClick and onChange are native browser events. When creating a custom component, such as AddToDoForm, adding a todo can be seen as an event that occurs within the component. To reflect this, we might want to expose a prop called onAddToDo.

When designing a component, it's important to consider how others will use it and what kind of prop names make sense. For example, if we want the user of the component to know that an addTodo event is happening, and if they want to interact with that event, they can pass a function to the onAddToDo prop.

Typically, we name the handler function handleAddTodo and pass it to the onAddToDo prop. The handler function is executed in response to a user interaction, and the prop name indicates that it's related to the addTodo event. The component itself doesn’t need to know what will happen when the form is submitted; it only needs to know that an addTodo event will occur. This approach results in a cleaner structure, even though the handler function could be included inside the component.

It's crucial to remember that each function should do only one thing. When thinking about a component in isolation from the rest of the app, we should ask: "What kind of prop should I pass here?" In this scenario, we want to signal to the user of the component that there is an addTodo event they can hook into. This approach aligns well with how typical JSX or HTML is structured.

# Example 2

This button component we're reusing which has its default styles but if the buttonType is secondary, there are going to
be some additional styles, such as opacity and size of the text.

In this case, we are setting both the log in and the register buttons as secondary, and it works perfectly fine for our case.
Now, for example, if i click on login, something different from the register should happen, to make it function properly
inside the button component we will have an onClick 



