# useState / useEffect "Mistake" nº 1: State updates aren't immediate,

If for example, on the button click, we call the handleClick function, which will increment the count state by 1, but if
on the same handleClick, we copy several times this setCount(count + 1) the value is still going to be 1, no matter how
many times we click on it, because our function returns the value of the count state + 1, the count state before the rerender
is always going to be 1.

One way, if we want to do it, is by using the updater function for updating the state, where we would take the previous value
and sum + 1 in the previous value, not the value of the state, then it will work as intended, by creating four times

setCount(prev => prev + 1)

We are also going to have the more recent value.

otherwhide it would be just setCount(0 + 1)

We tend to think the everytime, when we are updating the state, we should do it whis way, but that is not entirely true,
we can still update like setCount(count + 1), however in cases where we have multiple calls to the same updater, it will not
work as intended