## What is a Tenant?

A tenant can literally be a single user or any kind of entity that is using our saas, if there is multi tenancy there is
also single tenancy. 

- Single tenant (e.g. on-prem enterprise)
  
  A tenant would be an enterprise company which will have
  access to the app which has access to the db, all on their hardware, then when we have another customer, or another tenant,
  we would do the same, go to their hardware and install it on there.

  The benefit of this approach is that the data is completely isolated from each other so it is as secure as possible.
  Also, with some of this larger enterprises, they also want to customize it, they want to have full control of how they
  want to compute the data, assign to the app, and things like that.

  In the real world. this kind of approach is not so used anymore, it used to be more common when the cloud hadn't taken
  off yet, but these days, the vast majority of software is multi tenant.

- Multiple Tenant

  Let's say that for example we are selling, for example, a b2b expense managamento saas and this is on the cloud, so now
  we have more than one tenant, and for them, we are not going to create separate instances  of our saas, we just wanna have
  one instance running in our server, and all of the customers will connect to the same, we are going to have one database
  and all of the data will be on it.

  The multi-tenancy setup is shared, the hardware and db are shared.

  The benefits in this approach is that it is much cheaper, scalable and easier to maintain, than the other setup, where if
  we want to update something, we have to update it in all instances.

  From the developer point of view, this is much more efficient, so the vast majority of the setups are going to be like thione

  An example of multi tenancy, would be for example, we have a platform where users can create a blog, so then we would
  give them subdomains, for example, one customer would get blog-1.domain.com the other one blog-2.domain.comm etc...

  So let's say we are working on an ecommerce which allows users to make ecommerces websites, using the world of next.js
  as an example, vercel has an interesting template on this, the platforms template.
  The way they do this is by essentially when there is an incoming request, they need to know WHO is making that request
  and if the request is for blog-2, for example, in the nextJs, what they do is that in the middlware.ts file they are
  going to catch it, rewrite this to a new url, such as

  return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url))

  so it's going to rewrite the URL, to be, in this example, domain.com/blog-2, rewriting from a sub domain to a standard
  path and then with the app router we can have a dynamic router that would be the domains, like

  app/[domain]/page.tsx

  so we are going to use params to get to which tenant the request is for, this is a clever trick we can use in nextjs
  for a multitenant type of setup. This way have nothing to do with the hardware or anything, but that's what some people
  will mean when they talk about multi tenancy.

  In a saas environment, the vast majority is going to take the approach of three users pointing to the same app which will
  point to the same db, so the app is going to run on some server, and this computer is shared amongst the tenants.
  
  The data is not completely isolated, so in a setup like this, there are many benefits for us as a developer, but we do
  have to come up with a very robust way of makling sure that a tenant does not accidentally get to see the data of another
  one.

  We need to remember that when we are building an app, the most important thing is our data, so if we make some mistake
  with the UI, for example, if we render the wrong button or something like that, it's not the end of the world, as long
  as that don't really any expose the data or it doesn't allow some tenant to update data they shouldn't have access of.

  The data and the access to that data is paramount, and so, with a setup like this, it becomes really important that we
  have our authentication set up properly and that we route any incoming request, so we need to make sure which tenant
  is making that request so we can retrieve the data from the database that belongs only to that tenant, we do not want
  our customers to be e-mailing us about why they can see other people data.

  So in a setup like this, to ensure the data is properly isolated

