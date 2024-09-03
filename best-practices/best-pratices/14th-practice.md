# 14th Practice - use the URL for some state (filters, paginations, etc) not useState

 The useState is appropriate for that piece of data, however there are some pieces of data in an app where we're better off 
 not using useState hook but actually putting it in the URL, let's use in this example an e-commnerce, which have a t-shirt
 and that t-shirt has many colors, now let's say i picked the color white, we can see on the example that the color white
 it's actually being in the URL, as a query parameter, in this case, we would not create a state using useState for that.

 Let's say i create a const [selectedColor, setSelectedColor] = useState('')
 in this case that's not what we want to do in this case, instead we will prefer to make it part of the URL, and not on a
 useState, because then we would have that piece of data in two places, and we want to have only one source of truth, so
 the URL will become the source of truth, just in one place. The benefit of this practice, is that we can copy the url and
 share the URL with other people so then the other person can copy, paste that url, and when they come to the page, they will
 see the exact same view as what we were looking at, because based on this URL, we're going to show the appropriate color,
 by clicking on other color, it will update the url and so on.

 This would not be possible by using useState alone, in some pieces of data like filters, for example, or page number if
 we have multiple pages, we should try to make that a query param instead of using useState, because this pieces of data
 are more appropriate to be in the URL

 We'll have a lesson about this whole practice.
