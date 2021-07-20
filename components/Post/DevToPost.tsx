import Link from 'next/link'
import { Tag } from '../Tag'
import { IconBox } from '../Icons'
import format from 'date-fns/format'
import formatDistance from 'date-fns/formatDistance'

const DevToPostTimeStamp = ({ time }: { time: string }): JSX.Element => {
  const date = formatDistance(new Date(), new Date(time))
  const dateFormatted = format(new Date(time), 'dd/MM/yyyy')

  return (
    <time className='text-xs text-gray-400'>
      <div className='sr-only'>{dateFormatted}</div>
      <span className='block group-hover:hidden'>{date}</span>
      <span className='hidden group-hover:block'>{dateFormatted}</span>
    </time>
  )
}

export function DevToPost({ post }: { post: any }): JSX.Element {
  return (
    <article className='relative py-8 flex flex-col'>
      <a
        href={post.url}
        onClick={e => e.stopPropagation()}
        target='_blank'
        rel='noopener noreferrer'
        className='absolute left-[-30px] top-[60px]'>
        <IconBox
          icon='Devto'
          title='Written at Devto'
          className='hidden md:block w-6 h-6 text-black dark:text-white opacity-80 hover:opacity-100'
        />
      </a>
      <Link href={`/blogs/${post.slug}`}>
        <a className={'space-y-2 text-gray-700 group dark:text-indigo-300 opacity-80 hover:opacity-100'}>
          <DevToPostTimeStamp time={post.published_timestamp} />
          <h2 className='flex items-center text-2xl text-bold font-medium'>{post.title}</h2>
          <p className='hidden! md:block line-clamp-0 leading-relaxed'>{post.description}</p>
          <div className='flex flex-wrap space-x-1'>
            {post.tag_list.map((tag: string, i: number) => (
              <Tag key={i}>{tag}</Tag>
            ))}
          </div>
        </a>
      </Link>
    </article>
  )
}
