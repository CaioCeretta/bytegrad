'use client'

import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface MaxWidthWrapperProps {
  className?: string
  children: ReactNode
}

const MaxWidthWrapper = ({ className, children }: MaxWidthWrapperProps) => {
  return (
    /* MaxWidthWrapper is going to be a component which will be used basically on every place in our project
    Here is the cn explanation

    The cn() is a helper function from our utils, to the className we assign a ts object, which holds a call the cn
    the function takes as much arguments as we want, and as the first parameter we pass the default classes that are
    going to be applied by default.
    As the second parameter we are going to pass the className, which is going to be passed as a prop
    */
    <div
      className={cn(
        'mx-auto h-full w-full max-w-screen-xl px-2.5 md:px-20',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default MaxWidthWrapper
