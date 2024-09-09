'use client'

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useEffect, useState } from "react";

const BlogPost = () => {
  const [post, setPost] = useState<{ title: string, body: string }>()
;

  useEffect(() => {
    fetch('https://dummyjson.com/posts/1')
      .then(res => res.json())
      .then(data => {
        setPost(data)
      })
  }, [])

  return (
    <MaxWidthWrapper>
    { post ? (
      <article>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </article>
    ) : (
      <div>Loading Posts</div>
    )}
    </MaxWidthWrapper>
  )
}



export default BlogPost;