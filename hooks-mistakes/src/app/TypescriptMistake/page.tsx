'use client'

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { useEffect, useState } from "react";

const BlogPost = () => {
  const [post, setPost] = useState<{ title: string, body: string }>()
  const [loading, setLoading] = useState(true)
    ;

  useEffect(() => {
    fetch('https://dummyjson.com/posts/1')
      .then(res => res.json())
      .then(data => {
        setPost(data)
        setLoading(false)
      })
  }, [])

  return (
    <MaxWidthWrapper>
      {loading ? (

        <div>Loading Posts</div>

      ) : (<article>
        <h1>{post?.title}</h1>
        <p>{post?.body}</p>
      </article>
      )}
    </MaxWidthWrapper>
  )
}



export default BlogPost;