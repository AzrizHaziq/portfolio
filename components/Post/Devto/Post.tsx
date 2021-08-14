import React from 'react'
import { Devto } from '@helpers/server'
import { IconBox, Metadata } from '@components'
import { trackEvent } from '@helpers/analytics'

export function DevtoPost({ post }: { post: Devto.Post }) {
  const handleClick = () => trackEvent('blog_devto_read_external', null)

  return (
    <>
      <a
        href={post.url}
        target='_blank'
        rel='noopener noreferrer'
        onClick={handleClick}
        className='flex p-3 mt-5 bg-indigo-200 border-2 border-indigo-400 border-dashed rounded dark:bg-indigo-100 dark:text-black md:items-center group space-x-1 hover:shadow-md'>
        <IconBox icon='Devto' className='hidden w-10 h-10 md:block' title='Read this article at Devto website' />
        <div className='flex flex-col'>
          <span>Read this article at Devto Website</span>
          <small>
            Few of below content does not render properly so instead of reading here, you can read this in Devto
            instead.
          </small>
        </div>
      </a>
      <article className='prose lg:prose-xl'>
        <header>
          <h1 className='!my-2'>{post.title}</h1>
        </header>
        <Metadata
          tag_list={post.tag_list}
          reading_time={post.reading_time.text}
          published_timestamp={post.published_timestamp as string}
        />
        <div dangerouslySetInnerHTML={{ __html: post.body_markdown }} />
      </article>
    </>
  )
}
