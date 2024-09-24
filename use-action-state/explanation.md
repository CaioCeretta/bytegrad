# useActionState Lesson


In the latest react and next.js there is a new hook called useActionState, the primary way of working with server actions
is going to be something as e.g.

const [error, action, isPending] = useActionState(createTask, null)

it will give us a pending state, an error state and also an action we should pass to the form, if we are using one

in the first parameter, we are calling it error here, but it is actually whatever we return from our server action.

## First Example: Form

In the form action, the action is going to be the action returned by useActionState, 
