import Link from 'next/link'
import { Tag } from '../Tag'
import { Devto_Post } from '@helpers'

export function DevToPost({ post }: { post: Devto_Post }): JSX.Element {
  const date = new Date(post.published_timestamp)?.toLocaleDateString() ?? ''

  return (
    <article className='py-8 flex flex-col'>
      <time className='text-xs text-gray-400'>{date}</time>
      <Link href={'/'}>
        <a className={'space-y-2 text-gray-700 dark:text-indigo-300 opacity-80 hover:opacity-100'}>
          <h2 className='text-2xl text-bold font-medium mb-2'>{post.title}</h2>
          <p className='line-clamp-2 leading-relaxed'>{post.description}</p>
          <div className='flex flex-wrap space-x-1'>
            {post.tag_list.map((tag, i) => (
              <Tag key={i}>{tag}</Tag>
            ))}
          </div>
        </a>
      </Link>
    </article>
  )
}
