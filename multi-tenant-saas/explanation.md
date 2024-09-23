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

  So in a setup like this, to ensure the data is properly isolated, we are going to aas follows

  If we have one database for all clients, essentially one schema for everyone, what we are going to have is, let's say
  to a table, in it we have a bunch of data; entries; rows, let's use a sql database for this example. we can simply have
  a column for the tenant id, so if we are getting an incoming request from tenant id 5, then we know that when we interact
  with our database, we need to have a filter so that we only retrieve the rows where tenant id is 5.

  ## Example Nº 1

  Here we are listing all the expenses from the tenant with the id 5, so it would be

  const expenses = await prisma.expenses.findMany({
    where: {
      tenantId: 5
    }
  })

  but if we use it without the where it would show us all the expenses

  So remember, this tenant should not get access to all the data.

  And how we know the tenant id? This comes from the authentication solution, let's say we are using kinde, and we are in
  a b2b app, the tenant is going to be a company or an organization, so the tenant id is going to be the organization id
  we are able to retrieve that with the function getOrganization which we destructure from getKindeServerSession function,
  and finally, we call that function and store the id it into an organization variable

  const { getOrganization } = getKindeServerSession();
  const organization = await getOrganization()

  This is probably the easisest approach and the easiest way to get started

## Example Nº 2

If we still want to keep one database but we want a little bit more of isolation between each tenants data, we can also
set up a schema per tenant, so if we are a little bit more familiar with databases, or if we are building an app that
there are more stringent data isolation requirements, such as health care, banking, or some other really regulated type
of applicaiton, and so we don't want to take any risks, this other kind of approach would be better 

so is a set up where all the tenants still access the same app and db, but the db layer, there will be solution for iso
lating that further set up.

## Example Nº 3

It is possible that we want to keep separate databases for each tenant, we can do it, but it comes with additional comple
xities, and it may be worthwhile if our specific app really needs that, specially in highly regulated enterprises.

## Example of the video

Let's say for the purpose of this video, we do want to keep one database and we're just going to have one schema for all
the data.

So a b2b expense management, would work as follows:

So let's say we have a b2b expense management SaaS, and we have three expenses in our db, one for each tenant and we need
to keep track of which one created the expense.

In kinde, we registered both the users and create organization, placing a user in each organization

One of the ways for us to do that is by getting the getOrganization function from the function getKindeServerSession()
and assign the result of this getOrganization, which is going to the get the curent user organization, to a variable, and
utilize that organization on a where caluse of the findMany.

A good place to keep this database communication organized is by creating a folder in the src, named data-access, and inside
of it, many ts files of each schemas. Here we are using to get the expenses based on an organization id

One other thing, is that on kinde page, we can alter the roles and permissions of the admin.

So by going on the settings, we are going to be able to access the permissions of the admin user, and the idea here is that
we have permissions, which are the most granular unit of authorization.

So for example, here we are creating a permission that says that the user is able to view the expenses, other for creating
and so on.

And we can assign multiple of them by creating a role, such as

Manager Role, which can do everything with an expense, then we can assign to that role, the permissions we've just created.

Basic User Role, only can view expenses and all new users are going to be assigned to that role. 

Then, it will still not do anything, so we will get the function from kinde `getPermission`, then, we'll get if in the user
permissions it includes what we named it, in this case, view:expenses, if the user does not have that permission, he will
be redirected to an unauthorized page. 



