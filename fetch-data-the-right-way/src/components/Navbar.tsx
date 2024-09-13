
import { LoginLink, LogoutLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs/components'
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'
import React from 'react'

export default async function Navbar() {

  const { getUser } = await getKindeServerSession()

  const user = await getUser()

  return (
    <div className="w-full sticky border-b border-b-blue-200">
      <nav className='flex justify-center gap-10 font-bold'>
        {!user ? (
          <>
            <RegisterLink> Register </RegisterLink>
            <LoginLink> Login </LoginLink>
          </>
        ) : (
          <>
            <div className="flex gap-10 justify-center">
              <p>Hello {user.email}</p>
              <LogoutLink className='text-red-500'>Logout</LogoutLink>
            </div>
          </>
        )}

      </nav>
    </div>
  )
}
