import { addTodo } from '@/actions/actions'
import React from 'react'

export default function FormNew() {
  return (
    <form action={addTodo}>
      <input
        type="text"
        name="content"
        placeholder="Write your todo..."
        required
      />

      <button>Add</button>
    </form>
  )
}
