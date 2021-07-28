import { Devto } from '@helpers/server'
import { trackEvent } from '@helpers/analytics'
import { IconBox, TimeStamp } from '@components'

export function DevtoPost({ post }: { post: Devto.Post }) {
  const handleClick = () => trackEvent('blog_devto_read_external', null)

  return (
    <>
      <a
        href={post.url}
        target='_blank'
        rel='noopener noreferrer'
        onClick={handleClick}
        className='flex items-center mt-5 group space-x-1'>
        <IconBox
          icon='Devto'
          className='opacity-80 group-hover:opacity-100'
          title='Read this article at Devto website'
        />
        <span className='group-hover:text-blue-700'>Read this article at Devto Website</span>
      </a>
      <article className='prose lg:prose-xl'>
        <header className='!mt-5'>
          <TimeStamp time={post.published_timestamp as string} />
          <h1>{post.title}</h1>
        </header>
        <div dangerouslySetInnerHTML={{ __html: post.body_markdown }} />
      </article>
    </>
  )
}
