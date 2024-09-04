# 16 Practice - Instead of fetching data in useEffect, consider alternatives

This is, maybe, a good practice, because we typically wanna do data fetching in a different way, and this should be one
of those cases, in this example the instructor uses a different project from him. In that specific project, it has a sidebar
with job posts, and when we click on it, it will show the details from that job.

Here we have some data in the server side and we want to bring that to the react app, that is a fine case for useEffect,
and we will do it as follows:

Firstly, we define a state of isLoading and set it to false, also we add a state for the jobItem

and a
useEffect(() => {
  const fetchJobItem = async () => {
    setIsLoading(true)
    const response = await fetch(`${BASE_API_URL}/${activeId}`)
    const data = await response.json()
    setJobItem(data.jobItem);
    setIsLoading(false)
  }

  fetchJobItem();
}, [activeId])

So when any job opportunity is clicked, a fetch call to get all the details of this job post, and every job that's clicked
will have an id on the server side, that id will be placed on the address bar, as well as used for the job details.

We'll get that id from the url, call the fetch from the api route passing that activeId, and we'll get the job details. Only
after that we'll set the state based on it.

The use effect logic and rerendering is based on that activeId, which we utilize out of the useEffect to keep track of it.

So basically that's what's happening here, we are executing data fetching inside the useEffect.

The problem of that is, if we check the network tab from the dev tools, we will see that the first call is indeed the one
to that id, and if we click on the second one, there will be also a fetch for that id, so far so good, but what happens if
we click on the first one two times, like 1 > 3 > 1, we can see that there is another fetch call, and that is kinda strange
because we just did that fetch call, and this call is going to be repeated, and that's not efficient

That is essentially what happens if we do this useEffect. A better alternative would be for us to use react-query, like this

export function useJobItem(id: number | null) {
  const { data, isInitialLoading} = useQuery(
    queryKey: ["job-item", id],
    queryFn: () => (id ? fetchJobItem(id) : null),
    staleTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: Boolean(id),
    onError: handleError
  )
}

## React-Query Explanation

in this case useJobItem function is a custom hook that uses useQuery to fetch a job item based on the provided id, if the id
is null, no fetch is performed and if it's a number, it represents the job item id to fetch.


queryKey: ["job-item", id],

Purpose: A unique identifier for the query. React Query uses this to catch and manage the associated data with the query

queryKey is an array that uniquely identifies the query. In this case, it's ["job-item", id], which means that each job
item with a unique id will have its own cache entry. React Query uses this key to determine wheter it can return cached data
or if it needs to refetch data from the server

queryFn: () => id !== null ? fetchJobItem(id) : Promise.resolve(null)

Purpose: The function that actually performs the data fetching.

this function is exectured when the query run, if id is not null, it calls fetchJobItem with that id otherwise it returns
a resolved promise with null. This avoids trying to fetch data when there's no valid id and ensures the query function always
returns a promise

options

staleTime: determines how long the data is considered fresh before it's marked as stale
refetchOnWindowFocus: Contrls whether the query should refetch when window gains focus
retry: determines whether the rfunction should retry fetching if it fails
enabled: Control whether the query should run or be disabled
onError: a cb function that rujns when the query encounters an error

## End of React Query explanation

Now we are not using useEffect anymore, instead we are using the useQuery, and now if we click on an option we will get that
data, and if we click on it again, it instantly will show me job item, because the fetch result is already cached.
There are many other benefits for using a third party library, instead of doing data fetching ourselves with useEffect
a third party library may have taken care of many of the issues we may face.

If we utilize nextjs in the place of reactjs, it already has caching solutions out of the box, so in that case we don't 
even need react query






 


