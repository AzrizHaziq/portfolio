import React from 'react'
import { Metadata } from '@components'
import { MDXRemote } from 'next-mdx-remote'
import { Custom } from '@helpers/server/get_custom_post'

export function CustomPost({ post }: { post: Custom.Post }) {
  return (
    <div className='px-2 py-5'>
      <article className='prose lg:prose-xl'>
        <header>
          <h1 className='flex !mb-2 space-x-2'>{post.title}</h1>
        </header>
        <Metadata
          tag_list={post.tag_list}
          reading_time={post.reading_time.text}
          published_timestamp={post.published_timestamp as string}
        />
        <MDXRemote {...post.mdxSource} />
      </article>
    </div>
  )
}
