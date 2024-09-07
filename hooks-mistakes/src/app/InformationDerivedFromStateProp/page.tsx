'use client'

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useState } from "react"

const PRICE_PER_ITEM = 5;

export default function Cart() {
  const [quantity, setQuantity] = useState(1)
  const totalPrice = quantity * PRICE_PER_ITEM

  const handleClick = () => {
    setQuantity(quantity + 1)
  }


  return (
    <MaxWidthWrapper>
    <div>
      <button
      onClick={handleClick}
      className="bg-blue-500 px-4 py-2 text-white rounded-md"
      >
        Add 1 Item

      </button>

      <p>Total price {totalPrice}</p>
    </div>

    </MaxWidthWrapper>
  )
}
