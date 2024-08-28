# 6th Pratice - Use typescript

Typescript makes our code more strict, it helps us catch our mistakes a little bit faster, as well as giving us intellisense.

Let's use the login and register buttons as an example, these buttons can receive a prop named buttonType as secondary, if
we use regular js, all the properties would not give us a squiggly line on the arguments, because it does not care about
its typing.

We could say that the buttonType is a string, it won't be wrong, but we could make it more "stricter" by setting its type
as the only two available options, so by creating the ButtonProps interface, where we will tell that when we want to
create a Button component, we will have to have all the variables from the props, and for example

interface ButtonProps {
  onClick?: () => void,
  buttonType: "secondary" | "primary",
  children?: ReactNode,
  text?: string,
  className?: string
}

export default function Button({ onClick, buttonType, className, children, text }: ButtonProps) { ... }

Now it would be required for every button to have a buttonType as these two strings, and will the onClick, children, text
and className, are going to be optional. The reason why children and text are optional is because the person can create a
Button with the text element or the children element, to display on its children.

And now, by creating this, when we create a button we can use the intellisense by pressing ctrl + space and we are going to
see all the properties needed and the optional ones, as well as on the buttonType property, if we do the same thing, we are
going to see the only two available options, which are secondary and primary.

So summing up, typescript will warn us about any error and also gives us intellisense for what we must and should do.





