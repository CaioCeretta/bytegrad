# useState / useEffect "Mistake" nº 5 - Information can be derived from state / props

Let's say we have some kind of cart and the cart keeps track of the quantity, and everytime we click on the button, it
calls the function handleClick which will increase the quantity by one, then on for storing the total, a beginner would
do

const [totalPrice, setTotalPrice] = useState(0);

Then everytime we update the quantity, would also update the totalPrice, so another code augmentation, would be creating a
useEffect for it

useEffect(() => {
  setTotalPrice(quantity * PRICE_PER_ITEM)
}, [quantity])

It makes sense logically when we think about it, so we would, for example, put it on the page like

<p> Total price: {totalPrice} </p>

This works, but is very bloated and not really necessary.

for the totalPrice, we wouldn't need a useState or useEffect, 

because we can derive it from the quantity e from the price_per_item, so we can just create a variable in our function body

const totalPrice = quantity * PRICE_PER_ITEM, this would work the exact same.

Because what happening here is initially when it first renders this component, it will go in the function body, the quantity
will be 1, and will do the calculation, and if we click on handleClick it multiplies and so on.

So what we can take here as a teaching is that we do not always need to create new hooks, we can derive from the existent
values and states

_______________________________________________________________//_______________________________________________________

One other example for this would be if we had a state of firstName and always keep track of the last name, with a lastName
state.

We would think of creating a state of fullName, and it wouldn't be necessary, because we can derive it from existing states.

