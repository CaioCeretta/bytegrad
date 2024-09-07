'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React, { ChangeEvent, useState } from 'react'

export default function User() {
  const [user, setUser] = useState({ name: "", city: "", age: 50 })
  console.log(user)


  const handleChangeUser = (e: ChangeEvent<HTMLInputElement>) => {

    setUser(prev => ({...prev, name: e.target.value}))
  }

  return (
    <MaxWidthWrapper>

      <form>
        <input type="text" onChange={handleChangeUser} placeholder='Your name' />
      </form>
      <p>{user.name}</p>

    </MaxWidthWrapper>
  )
}
