import { useState } from "react"

export default function StateUpdatesImmediately() {

  const [count, setCount] = useState(0)

  const handleClick = () => {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
  }

  



  return (
    <div className="w-full">
      <button
      onClick={handleClick}
      className="bg-blue-500 px-4 py-2 text-white rounded mb-4"
      >
        Click Me!
      </button>

      <p>Count is: {count}</p>
    </div>
  )
}
