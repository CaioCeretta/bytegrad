'use client'

import { useFormStatus } from "react-dom"

export default function Button() {
  const {pending} = useFormStatus()
  
  return (
    <button disabled={pending} type="submit" className="rounded-md bg-sky-700 text-white
    px-4 py-2">
      {
        pending ? "Adding todo..." : 'Add'
      }
      
    </button>
  )
}
