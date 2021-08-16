import Link from 'next/link'
import { IconBox, Tag, TimeStamp } from '../..'
import { Devto } from '@helpers/server/get_devto'

export function DevtoPostList({ post }: { post: Devto.Post }): JSX.Element {
  return (
    <article className='relative flex flex-col py-8'>
      <a
        href={post.url}
        onClick={e => e.stopPropagation()}
        target='_blank'
        rel='noopener noreferrer'
        className='absolute left-[-30px] top-[60px]'>
        <IconBox
          icon='Devto'
          title='Written at Devto'
          className='hidden w-6 h-6 text-black md:block opacity-80 hover:opacity-100'
        />
      </a>
      <Link href={`/blogs/${post.slug}`}>
        <a className={'space-y-2 text-gray-700 group opacity-80 hover:opacity-100'}>
          <span className='text-xs'>
            <TimeStamp separator={false} time={post.published_timestamp} />
          </span>
          <h2 className='flex items-center text-2xl font-medium text-bold'>{post.title}</h2>
          <p className='leading-relaxed hidden! md:block line-clamp-0'>{post.description}</p>
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
