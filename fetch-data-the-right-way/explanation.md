## Docker run call

Break down the docker run command

environment variables set

postgres_password

default behavior

user: postgres (default username)
password: postgres(defult password)





## Latest Next JS

A lot of things have changed in the latest next js, we know have the app router, but with react server components the line
between server and client have blurred and many other things have changed.

In this lesson we're going to talk about how to structure or architect our next js applications

## Security in next js

in the next js security documentation, it advices us to use a Data Access Layer for new projects, basically it says to us
to do an authentication check before we interact with our database, and there is a certain way that we can structure our
application and make sure we do that.

## Why do we need something fancy like Data Access Layer?

1. Direct Data Access and Security:

For a simple project, like a homepage with an article link, you might directly access the database using an ORM like prisma.

const articleData = await prisma.article.findFirst()

Security Concerns: Directly accessing and rendering data without appropriate security checks can be risky. If the article
content should only be accessible to authenticated users, ensuring proper access control is crucial to prevent unauthorized
access.

2. Server-Side Authentication:

Tools like Kinde or other authentication libraries can help secure routes. For example, we might use middleware to protect
a route. If we have, for example, this middleware

```
import { withAuth } from "@kinde-oss/kinde-auth-nextjs/middleware";

export default function middleware(req) {
  return withAuth(req);
}

export const config = {
  matcher: ["/article"]
}
```

Effectiveness: While this middleware approach can secure specific routes, it does not inherently protect data when components
are reused or when data is accessed from different parts of the application

3. Components Reuse and Security Gaps:

When we refactor data fetching logic into reusable components, such as creating a Text component to fetch and display article
content, we introduce potentional security gaps;

Example: While fetching article data inside the Text component works securely on the article page (where authentication checks
are in place), the risk arises when this component is reused in other parts of the application. If the Text component is
rendered in a public route, such as the homepage, the sensitive data could be fetched and exposed to unauthorized users.

Middleware Limitations: Protecting the /article route with middleware does not automatically extend protection to the Text
component when it's used elsewhere in the application. This gap between route-level authentication and component-level data
fetching introduces potential security risks.

By structuring it this way, the third point clearly addresses the security risks involved with component reuse and data access

But this is a very quick way to secure some data.

Typically we do not want to add to the layout this kind of thing, it's very tempting for us to do it easier this way like
in the component which will need, but it's not a good practice, even adding that authentication to the layout, which will
wrap the whole code.

Because if we do on the layout page, whenever we click on a authenticated page, it wouldn't do the check for us again.

So, if we are doing like that, we would choose to do it on a middleware or on the page.

Let's say we indeed write it in the article page, a check if the user is authenticated, what would be the issue with this?

The issue with this could be when we refactor the data fetch into a separate component.

In the current case, we a dedicated component for the Text, in next Js, it would be fine to have a separate component to
get the data, but now we have a gap, where we are authenticating (the article page), is different from where we are accessing
the database (getting the article data).

So far so good, but react developers tend to think a lot of reusability

But us or the other developer on the team, could accidentally uses this Text component in the homepage, and if we do that
on the homepage, we are going to be able to access the article data. So even if we logout, clear all of our cookies, since
the homepage is not protected, and we don't have any authentication check, this piece of text that should be protected, is
not protected right now. And this is where the concept ot data access layer comes into play

## Data Access Layer

Here, what we wanna do, is we wanna have one centralized place or layer in our application that we want to interact with
our db.

One option would be to create a folder for our data access, we would, for example. create a data-access folder and inside
of it, create an article.ts file where we would interact with the article table and put this content

import { db } from "@/db";

export async function getArtiel() {
  const articleData = await db.article.findFirst()

  return articleData
}

Now we want to get some data in our application somewhere, we are not going to randomly perform these types of fetches in
some component. We know have one function to getting the article, we have one specific place to get it, so we could do it
on the Text component which were doing the fetch to get the article.
Since we are always doing the fetches here, we could also do the authentication check inside of the article function

So the whole function we did inside the article page

  const {isAuthenticated} = getKindeServerSession()

  if(!(await isAuthenticated())) {
    redirect("/api/auth/login")
  }


we can pass it to the article data access get function, we first do the auth check and then fetch the values. By doing
this, we will now be able to fetch the data whenever we want in a secure manner. We can be rest assured that the authentication
check is always been done because there is no gap now, between the auth check and the place where i'm checking the database.

There is no gap between each other, they ride after each other, they are in the same function.

This is a benefit of using data access layer, it's safer for us, because now whenever we need to get the article we just
use that one function, which takes care of all the authentication and potential authorization logic.

Sometimes we also would like to have a page level defence, maybe a more of convenience way, but adding that redirect
if the user is not authenticated, on the article page, is also one option.

In addition to all of that, whenever we need to get access to a piece of data, in this case, a particular article, we could
also create a separate function for that. In this function we are also going to do that authentication check.  

 A data-access layer is not an API, is a code that we structure in our app, sometimes if we opt for utilizing an external
 we API, when we are using an API we are often going to the network and maybe other complications that come from that.

 Instead, we can structure our application code slightly differently so every interaction with our database is going to be
 on data-access folder, we could create a separate file for each model we have on our database and utilize just that for
 those interactions

One of the biggest benefits of this pattern, is for refactoring, now we certainly know where all the interactions are
coming from, we are never going to be lost trying to find where we left the logic code.











