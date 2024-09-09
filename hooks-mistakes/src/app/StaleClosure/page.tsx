'use client'

import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { useEffect, useState } from "react"

export default function CounterExample() {
  const [count, setCount] = useState(0)

  useEffect(() => {

    const countInterval = setInterval(() => {
      console.log("Interval function running...")

      setCount(prev => prev + 1)
    }, 1000)

    return () => {
      clearInterval(countInterval)
    }
  }, [])

  return (
    <MaxWidthWrapper>
      <p>Count is: {count}</p>  
    </MaxWidthWrapper>
  )
}
