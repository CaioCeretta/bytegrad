# useState / useEffect mistake 4: Object state instead of multiple smaller ones

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



