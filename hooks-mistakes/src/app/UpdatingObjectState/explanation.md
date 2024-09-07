# useState / useEffect mistake 3: Updating object state

Let's say we have this state

  const [user, setUser] = useState({ name: "", city: "", age: 0 })


then we have an input for the user.name, we would normally add on the input of the name a onChange function, but if we say
only to that function setUser((user.name = e.target.value))

we may think that, it could have happen because we are not returnin an object and the user has the type of an object and
change it to setUser({name: e.target.value}), we will now se, if we console.log the user state, it will have just the name
and the other properties were discarded

So basically we need to copy over the previous object, and alter just the properties we want, like

setUser(prev => ({
  ...prev,
  name: e.target.value
}))

now the prev is the previous state, and we are spreading the previous state, but updating the name with the input value, and
because it is after the ...prev, it will override that property, and we can't forget that now because we are returning something
from that function, we need first the parentheses to wrap the curly braces of the object. This is a shorthand, if we want
to be more specific we could use the setUser(prev => {
  return 
    {
      ...prev,
      name: e.target.value
    }
  
})