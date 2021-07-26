import React from 'react'
import { MDXRemote } from 'next-mdx-remote'
import { Custom } from '@helpers/server/get_custom_post'

export function CustomPost({ post }: { post: Custom.Post | any }) {
  return (
    <>
      <article className='prose lg:prose-xl'>
        <header>
          <h1>{post.title}</h1>
        </header>
        <MDXRemote {...post.mdxSource} />
      </article>
    </>
  )
}
