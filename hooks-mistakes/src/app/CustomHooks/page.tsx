"use client";

import { useEffect, useState } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState(1920)

  useEffect(() => {
    const handleWindowSizeChange = () => {
      setWindowSize(window.innerWidth)
    }

    window.addEventListener("resize", handleWindowSizeChange)

    return () => {
      window.removeEventListener("resize", handleWindowSizeChange)
    }
  }, [])

  return windowSize
}

export default function ExampleComponent1() {

  const windowSize = useWindowSize();
  

  return (
    <div>
      <p>{windowSize}</p>
      Component 1
    </div>
  );
}
 
export function ExampleComponent2() {
  const windowSize = useWindowSize();

  <p>{windowSize}</p>

  return <div>Component 2</div>
}