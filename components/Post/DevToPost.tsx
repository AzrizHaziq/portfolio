import Link from 'next/link'
import { Tag } from '../Tag'
import { IconBox } from '../Icons'
import { Devto_Post } from '@helpers'
import formatDistance from 'date-fns/formatDistance'

export function DevToPost({ post }: { post: Devto_Post }): JSX.Element {
  const date = formatDistance(new Date(), new Date(post.published_timestamp))

  return (
    <article className='relative py-8 flex flex-col'>
      <a
        href={post.url}
        onClick={e => e.stopPropagation()}
        target='_blank'
        rel='noopener noreferrer'
        className='absolute left-[-30px] top-[53px]'>
        <IconBox
          icon='Devto'
          title='Written at Devto'
          className='hidden md:block w-6 h-6 text-black dark:text-white opacity-80 hover:opacity-100'
        />
      </a>
      <Link href={'/'}>
        <a className={'space-y-2 text-gray-700 group dark:text-indigo-300 opacity-80 hover:opacity-100'}>
          <time className='text-xs text-gray-400'>
            <span className='block group-hover:hidden'>{date}</span>
            <span className='hidden group-hover:block'>{new Date(post.published_timestamp).toLocaleDateString()}</span>
          </time>
          <h2 className='flex items-center text-2xl text-bold font-medium'>{post.title}</h2>
          <p className='hidden! md:block line-clamp-0 leading-relaxed'>{post.description}</p>
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
