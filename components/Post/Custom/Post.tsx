import React, { useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import { Custom } from '@helpers/BE/get_custom_post'

export function CustomPost({ post }: { post: Custom.Post }) {
  const Component = useMemo(() => getMDXComponent(post.code), [post.code])

  return (
    <>
      <article className='prose lg:prose-xl'>
        <header>
          <h1>{post.title}</h1>
        </header>
        <Component />
      </article>
    </>
  )
}
