import { IconBox } from '@components'

export function DevtoPost({ post }: any) {
  return (
    <>
      <a href={post.url} className='mt-5 group flex items-center space-x-1'>
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
