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

From the developer point of view, this is much more efficient, so the vast majority of the setups are going to be like thisone


