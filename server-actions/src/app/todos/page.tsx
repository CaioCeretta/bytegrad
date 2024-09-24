import { MaxWidthWrapper } from '@/components/MaxWidthWrapper'
import React from 'react'

export default function TodosPage() {
  return (
    <MaxWidthWrapper>
      <main className='flex min-h-screen flex-col items-center 
      w-full p-24'>
        <h1 className="text-3xl font-bold">Todos Page</h1>
        <form className="flex flex-col w-[300px my-16">
          <input type="text" className='bg-white' />
          <button type="submit" className="rounded-md bg-sky-700 text-white">
            Add
          </button>
        </form>
      </main>
    </MaxWidthWrapper>
  )
}
