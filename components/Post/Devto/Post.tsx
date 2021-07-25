import { IconBox } from '@components'
import { trackEvent } from '@helpers/analytics'

export function DevtoPost({ post }: any) {
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
        <header>
          <h3 className='mt-2'>{post.publishDate}</h3>
          <h1>{post.title}</h1>
        </header>
        <div dangerouslySetInnerHTML={{ __html: post.body_markdown }} />
      </article>
    </>
  )
}
