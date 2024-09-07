# useEffect / useState "Mistake" nº 2 - Conditional Rendering

Let's use a component that receives an id in this example

It has a check in the beginning which will check if the id exists and stop there, everytime it runs a return keyword, it
stops there.

but let's say that after that if, we have a hook call, in this case, useState and useEffect, and we already get red squigly
lines under the hook call, saying that "React Hook is being called conditionally and needs to be called in the exact same order in
every component render. Did you accidentally call a react hook after an early return?"

So, sometimes the id may not exist and therefore we already return out of the function, but sometimes that id may exist
and then we actually do use useState and useEffect, but that is not allowed in react.

The hook invocation always needs to be the same in every render, which neans that i can't depend on the existence of the
id, the wrong use case would be

  if(!id) {
    return 'No id provided'
  }

  const [something, setSomething] = useState('blabla')

  useEffect(() => {
    
  }, [something])



so we need to use the useState and useEffect before the if conditional, then it would be

  const [something, setSomething] = useState('blabla')

  useEffect(() => {
    
  }, [something])

  if(!id) {
    return 'No id provided'
  }

  and as a matter of style, the two returns isn't very good for the code visual, so it would be as follows:

  return 
    <section>
      {
        !id ? "No id provided" : <div>Product Card {id} </div>
      }
    </section>
  

