'use client'


import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useState } from "react";

const Price = () => {
  console.log('component rendered')
  // const [price, setPrice] = useState(0)
  const [price, setPrice] = useState({
    number: 100,
    totalPrice: true
  })

  const handleClick = () => {
    setPrice({
      number: 100,
      totalPrice: true
    })
  }

  return (
    <MaxWidthWrapper>
      <button
        onClick={handleClick}
        className="bg-blue-500 py-2 px-4 rounded text-white"
      >
        Click me
      </button>
      <p>{price.number}</p>

    </MaxWidthWrapper>
  );
}
 
export default Price;