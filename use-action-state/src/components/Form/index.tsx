'use client'

import { createTask } from '@/actions/createTask'
import React, { useActionState } from 'react'

export default function Form() {
  const [error, action, isPending] = useActionState(createTask, null)

  return (
    <form action={action} className='flex flex-col gap-y-2'>
      <input
        type="text" 
        name="content"
        placeholder="New Task"
        className='py-2 px-3 rounded-sm'
      />

      <button
        disabled={isPending}
        className='bg-blue-500 text-white py-2 px-3 rounded-sm'
      >
        Submit
      </button>

      {isPending && <p>Loading...</p>}
      {error && <p className='text-red-500'>{error}</p>}
    </form>
  )
}
