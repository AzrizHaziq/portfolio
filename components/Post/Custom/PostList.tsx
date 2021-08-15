import Link from 'next/link'
import { Tag, TimeStamp } from '../..'

export function CustomPostList({ post }: { post: any }): JSX.Element {
  return (
    <article className='relative flex flex-col py-8'>
      <Link href={`/blogs/${post.slug}`}>
        <a className={'space-y-2 text-gray-700 group opacity-80 hover:opacity-100'}>
          <span className='text-xs'>
            <TimeStamp time={post.published_timestamp} />
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
