'use client'

import React, { useEffect, useState } from 'react'

export default function ConditionalRendering({ id }: {id: number}) {
  if(!id) {
    return 'No id provided'
  }

  const [something, setSomething] = useState('blabla')

  useEffect(() => {
    
  }, [something])


  return (
    <section>
      {/* Product Card */}
    </section>
  )
}
