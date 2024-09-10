'use client'

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useEffect, useState } from "react";

export default function Post() {
  const [id, setId] = useState(1);

  return (
    <MaxWidthWrapper>
      <div>
        <button
          onClick={() => setId(Math.ceil(Math.random() * 100))}
          className="bg-blue-500 px-4 py-2 text-white rounded mr-2">
          Show me a different post
        </button>

        <PostBody id={id} />

      </div>
    </MaxWidthWrapper>
  )
}

export function PostBody({ id }: { id: number }) {
  const [text, setText] = useState('');

  useEffect(() => {
    const controller = new AbortController()

    fetch(`https://dummyjson.com/posts/${id}`, {
      signal: controller.signal
    })
      .then(res => res.json())
      .then(data => setText(data.body))

      return () => controller.abort()
  }, [id])

  return <p>{text}</p>
}