

'use client'

import { useState } from "react"

export default function FormOld() {

  const [inputText, setInputText] = useState<string>('')

  const handleSubmit = async () => {
    await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ content: inputText}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return (
    
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="content"
        placeholder="Write your todo..."
        required
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
    </form>


  )
}
