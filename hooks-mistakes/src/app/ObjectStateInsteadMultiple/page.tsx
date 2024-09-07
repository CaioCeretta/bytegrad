'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { ChangeEvent, FormEvent, useCallback, useState } from 'react'

export default function Form() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    zipCode: ''
  })

  // const handleSubmit = (e: FormEvent) => {
  //   e.preventDefault()

  //   // Create a FormData object to get all form values
  //   const formData = new FormData(e.target as HTMLFormElement)

  //   // Convert formData to an objkect and update the state
  //   const formValues = Object.fromEntries(formData.entries())

  //   setForm(prev => ({
  //     ...prev,
  //     ...formValues
  //     })
  //   )

  //   console.log('Form submitted:', formValues)

  // }



  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

  //   setForm(prev => ({
  //       ...prev,
  //       [e.target.name]: e.target.value
  //     })
  //   )
  // }

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

  console.log(form)

  return (
    <MaxWidthWrapper>
      <form onSubmit={handleSubmit} className='flex flex-col gap-y-2'>
        <input
          type="text"
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder='First Name'
          className='px-4 py-2'
        />

        <input
          type="text"
          name="lastName"
          placeholder='Last Name'
          value={form.lastName}
          onChange={handleChange}
          className='px-4 py-2'
        />
        <input
          type="text"
          name="email"
          placeholder='E-mail'
          value={form.email}
          onChange={handleChange}
          className='px-4 py-2'
        />


        <input
          type="password"
          name="password"
          placeholder='Password'
          value={form.password}
          onChange={handleChange}
          className='px-4 py-2'
        />

        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder='Address'
          className='px-4 py-2'
        />

        <input
          type="text"
          name="zipCode"
          value={form.zipCode}
          onChange={handleChange}
          placeholder='Zip Code'
          className='px-4 py-2'
        />


      <button type='submit'> Salvar </button>

      </form>
    </MaxWidthWrapper>
  )
}
