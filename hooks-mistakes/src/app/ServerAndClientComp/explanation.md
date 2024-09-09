# useState / useEffect "Mistake" nº 9: Server & Client components

We know that exist client and server components in react, but if we are using next js, if we are using vite or create
react app, we may not have seen it yet.

By default, our components are server components, and they are only going to run on the server, and on the server, they
will not keep track of the state, so if we are using useState in a server component, it will throw us an error, because
we need to convert it to a client component, by adding 'use client' add the top. Every other hook won't work, and if we
do anything with the window object, which is from the browser, for example, an alert would also not work because it there
is no window on the server.

So whenever we need access to those client side features, we need to convert the component to a client component. There are
two ways of doing that, which is by adding the useClient at the top, or we can import it from another component, which is
already a client component.

For example, a component has 'use client' at the top, and if we import that other component in that file, it will automatically
become a client component.

