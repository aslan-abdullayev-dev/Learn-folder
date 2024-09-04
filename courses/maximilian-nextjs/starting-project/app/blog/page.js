import React from 'react';
import Link from "next/link";

const BlogPage = (props) => {
  return (
    <main>
      <h1>the blog</h1>
      <p><Link href="/blog/post-1">Post 1</Link></p>
      <p><Link href="/blog/post-2">Post 2</Link></p>
    </main>
  )
}
export default BlogPage;