'use client'

import { useEffect, useState } from 'react'

export default function ConditionalRendering({ id }: {id: number}) {
  const [something] = useState('blabla')
  
  useEffect(() => {
    
  }, [something])
  


  return (

    <section>
      {
        !id ? "No id provided" : <div>Id: {something} Product card {id}</div>
      }
    </section>
  )
}
