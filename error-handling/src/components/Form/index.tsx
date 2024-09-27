'use client'

import { addTodo } from '@/actions/actions'
import { useState } from 'react'
import Button from '../Button'

export default function Form() {
  const [error, setError] = useState('')

  const clientAction = async (formData: FormData) => {

    const result = await addTodo(formData)

    if (result?.error) {
      //Show error
      setError(result.error)
    } else {
      setError('')
    }
  }

  return (

    <form action={clientAction} className="flex flex-col w-[300px my-16">
      <input
        type="text"
        placeholder="Add your todo"
        name="content"
        className='px-4 py-2 mb-3 dark:bg-white bg-gray-200 text-black' required
      />
      <Button />

      {
        error && (
          <p className="text-red-500">{error}</p>
        )
      }

    </form>
  )
}
