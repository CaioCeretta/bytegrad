# 4th Best Practice - Avoid unnecessary markup

One thing the instructor sees very often is that he sees people creatring unecessary divs. Let's say we are going to create
 a reusable component, as an example, we can use the Btn component. Very often, people will return a div, and inside of it
 people will return the button element, like

    <div>
      <button>Click me!</button>
    </div>

and people would keep this div, it's necessary, and have some downsides, so we actually want to remove them and directly
return a button element like just 
  <button>Click me!</button>
and if in the example of the login in and register from the sidebar, if we are already logged in we don't want those
buttons to show, now we are going to have two buttons inside if the user is not authenticated, so we can't utilize them
without a parent component, and for avoiding create a div which would change the default behavior of the styling, we could 
just use fragments and wrap the  buttons in a <></>
