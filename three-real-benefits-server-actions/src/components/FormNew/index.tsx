import { addTodo } from '@/actions/actions'
import React from 'react'
import { useFormStatus } from 'react-dom'
import Button from '../Button'

export default function FormNew() {
  const { pending } = useFormStatus()

  return (
    

    <form action={addTodo}>
      <input
        type="text"
        name="content"
        placeholder="Write your todo..."
        required
      />

      <Button />
    </form>
  )
}
