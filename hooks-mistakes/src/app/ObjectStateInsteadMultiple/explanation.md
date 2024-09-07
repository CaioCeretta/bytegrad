# useState / useEffect "Mistake" nº 4: Object state instead of multiple smaller ones

We are going to use a form as an example, here the form will have 6 inputs, but it could have several ones more.

if we add a state for each input, like firstName, lastName, zipCode, email, password and so on, it would start to pollute
our code, it's cleaner for us to do something like creating an object for the state

const [form, setForm] = useState({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  address: '',
  zipcode: ''
})

then we create a function to handle the input changes, like

setForm(prev => ({
        ...prev,
        [e.target.name]: e.target.value
      })
    )

the e.target.name will get the name of the input, so it will now be dynamic

Improvement 2, create change that function to this, which would now be dynamic

const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    zipcode: ''
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

    setForm(prev => ({
        ...prev,
        [e.target.name]: e.target.value
      })
    )
  }

Improvement 3 - Uncontrolled Inputs - Optional : store in the state only after the submit

export default function Form() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    zipcode: ''
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    // Create a FormData object to get all form values
    const formData = new FormData(e.target as HTMLFormElement)

    // Convert formData to an objkect and update the state
    const formValues = Object.fromEntries(formData.entries())

    setForm(prev => ({
      ...prev,
      ...formValues
      })
    )

    console.log('Form submitted:', formValues)

  }



}


# 3rd Improvements with Caveats

But in this case for the 3rd improvement, is quite personal for each use case, because in controlled forms small re-renders,
with not so many inputs, the re-renders would not concern our performance, however, in larger forms with more inputs, it
would be indeed concerning

We have some strategies to mitage re-renders

1. useCallback for the handleChange function: by memoizing the handleChange function using useCallback, React will prevent
the function from being recreated on every render. This can reduce performance issues in some cases
2. update state in batches: instead of updating state for every keystroke, we can debounce state updates, so the form only
re-renders after a small delay or user stops typing.
3. Splitting the State: Instead of keeping the entire form in a single object, we can use individual state slices for each
input, or even for different sections of the form. This will reduce the number of re-renders affecting unrelated inputs.
4. Use a form management library: Libraries like Formik or React Hook Form are optimized for performance, handling form
state more efficiently.

### Updated Approach: 

const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    zipCode: ''
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', form)
  }

  

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: value
    }))
  }, [])

  return (
    <MaxWidthWrapper>
      <form onSubmit={handleSubmit} className='flex flex-col gap-y-2'>
        <input
          type="text"
          name="firstName"
          placeholder='First Name'
          value={form.firstName}
          onChange={handleChange}
          className='px-4 py-2'
        />

    ... rest of code

What this will do is, handleChange is memoized so it will not be recreated on every render.

For furthure knowledge we can try implementing input bouncing, but here won't be that case.

* In our case, we'll keep the second improvement *


