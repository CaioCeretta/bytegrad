# 12th Practice - Use single state instead of multiple states

Sometimes for a particular state, for booleans very often, let's use the isLoading as an example. We may also want to consider
that in the future we may also have other states, for example, if we were fetching data, there could also be an error, so
isLoading, isError, are going to be states, then an isSuccess, and so on...

What we may want to do in those cases is have one piece of state and just call it status

type Status = "idle" | "loading" | "error" | "success

const [status, setStatus] = useState<Status>('idle'); 

and if the state is loading, it would simply be setStatus('loading');

so instead of immediately using a boolean, like isLoading, isError, ..., maybe we want to use a union type for this, it
is sometimes a slightly better practice, it keeps the possible statuses confined to one piece of state.

