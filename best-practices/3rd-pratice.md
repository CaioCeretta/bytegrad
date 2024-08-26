# 3rd Best Pratice - When to create components

We actually do wanna create many components, but when should we create a component, we have to imagine in a real world
we are, for example, getting a website design from a designer, and it's up for us as a developer to transform that into
a working code.
And let's use this page as an example, we are going to have the todos listed, on the right we will have a sidebar for
the user to add the todo to the list, login and register

Now in the world of react, it's all about components, which is just an independent piece of the UI, and as a developer
we should identify which are those independent pieces that make up the entire ui, and which pieces we are going to reuse.
In this app we have those three buttons, add to list, login, register and we are using the same button styling for each
one of them, so in react we are looking for opportunities where we can reuse markup in jsx, styling, etc. The markup and the styling in this three buttons are pretty much the same, and it makes sense for us to create one reusable button component
for them. Now, if we need to make one  change, we only need to alter one place.

There are many benefits of reusing many components, in this case of the button, since the differences between them are  very
small and subtle, it makes sense to put them in one component. In a real world, there are going to be many components
which we are not going to reuse, the sidebar component, for example, but we are also going to create one for that, just
for organization purposes, also the header, we are never going to reuse that, but is made for the same purpose.

So as a best practice, we do wanna create a lot of components, certainly for things we are going to reuse, and even somethings
we are going to reuse it only once, is ok to create a separate component for that, since they help us to have a cleaner
markup and jsx.

We could see as an example, the main page of our app

it has a div, which will handle the dimensions, color, height of the div, then we have simple components, which makes that
div well organized, and we don't have to worry to much about understanding a complete file.

the background heading is just a h1, the header is just a div, etc, so it's a good practice.

On the button component, we can see it's quite chaotic because the number of classes, if we prefer, we can create a class
with all the styles in a separate file, or if it's not too polluted for us and our team, we can keep it this way

if we check it clearly, we will see that even though the button share the same component, it has a little difference
on the shades of dark brown, and at certain instance, we can customize it with props, like buttonType is secondary
and on the component we have a ternary to know which opacity to apply on cases of secondary or primary. 



