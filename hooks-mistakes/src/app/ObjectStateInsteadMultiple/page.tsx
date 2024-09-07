'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { ChangeEvent, useState } from 'react'

export default function Form() {
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

  console.log(form)

  return (
    <MaxWidthWrapper>
      <form className='flex flex-col gap-y-2'>
        <input
          type="text"
          name="firstName"
          onChange={handleChange}
          placeholder='First Name'
          className='px-4 py-2'
        />

        <input
          type="text"
          name="lastName"
          onChange={handleChange}
          placeholder='Last Name'
          className='px-4 py-2'
        />
        <input
          type="text"
          name="email"
          onChange={handleChange}
          placeholder='E-mail'
          className='px-4 py-2'
        />

        
        <input
          type="secret"
          name="password"
          onChange={handleChange}
          placeholder='Password'
          className='px-4 py-2'
        />

        <input
          type="text"
          name="address"
          onChange={handleChange}
          placeholder='Address'
          className='px-4 py-2'
        />

        <input
          type="text"
          name="zipCode"
          onChange={handleChange}
          placeholder='Zip Code'
          className='px-4 py-2'
        />




      </form>
    </MaxWidthWrapper>
  )
}
