# Fifth Practice - Don't add layoutr styled to reusable component

## Example 

In the other project from bytegrad, he ran into a very clear example of this

He had the homepage where he had a big heading telling the people

"Find events around you", and a search box below it.

But he wanted to have that h1 on other pages aswell, so in the list of events, he also wants the same h1 as the heading

so he created and exported a H1 component, which will have a h1 and some styling, then on the homepage, he utilized this
component to use as a heading, but he also wanted the h1 on other page so he imported it as well.

## The Problem

The problem is that on the homepage it looks good and on the events page it also looks good, but we can see on the events
page, that the spacing of the events heading and the items is too small, and what he would like to do is to add some margin
to the bottom of the h1 component to push the list down.
So we go to the h1 element, and on the h1 className add a margin bottom on the styling but now if we go to the home page
where it was ok, we can see that it has a bigger margin than expected.
This happens because it's a reusable component, it may work for one particular case, but may not be good for others.

So adding layout styling to reusable components we don't want to do, because it would affect every instance where it's
created.
So tipically we don't want to add margins, paddings, to reusable components, as well as display styling, such as flex or grid.

## The solution

### Solution no1:

Inside the component where we use the h1, wrap this component into a div, and style it particularly where it will contain
all the styles we want, eg

<div className="mb-28">
  <H1>Events in São Paulo</H1>
</div>

Then we will fix the problem, even though it is still not ideal, because there is an even cleaner solution

### Solution no2:
 
We can modify our code, so the component will accept the className attribute, so in the h1 component we can also accept a
className, and utilize the cn

