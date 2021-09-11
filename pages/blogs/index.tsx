import Link from 'next/link'
import { GetStaticProps } from 'next'
import { Post } from '@helpers/server/post'
import { useTrackPage } from '@helpers/analytics'
import { getAllPostSortedByDate } from '@helpers/server/get_all_posts'
import { ExtendHead, IconBox, Nav, Tag, TimeStamp } from '@components'

function PostList({ post }: { post: Post.Custom | Post.Devto }): JSX.Element {
  return (
    <article className='relative flex flex-col py-8'>
      {post.type === 'devto' && (
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
      )}
      <Link scroll={false} href={`/blogs/${post.slug}`}>
        <a className={'space-y-2 text-gray-700 group opacity-80 hover:opacity-100'}>
          <span className='text-xs'>
            <TimeStamp separator={false} time={post.published_timestamp as string} />
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

export default function Blogs({ data }: { data: Post.Devto[] }) {
  useTrackPage({ title: 'blogs', path: '/blogs' })

  return (
    <>
      <ExtendHead
        url='/blogs'
        title='Enjoy reading 😀'
        description='Do share the post if you find interesting'
        imgUrl='/assets/routes/blogs.png'
        imgAlt='Hope you enjoy reading my writings'
      />
      <Nav />
      <main className='container max-w-xl px-5 mx-auto md:max-w-3xl'>
        <section className='py-10'>
          <ul className='-my-8 divide-y-2 divide-gray-200 dark:divide-gray-800'>
            {data.map(post => (
              <li key={post.id}>
                <PostList post={post} />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}

export async function getStaticProps(context: GetStaticProps) {
  const sortedData = await getAllPostSortedByDate()

  // generate images for /blog/:slug
  // if (process.env.NODE_ENV === 'development')
  //   for (let post of sortedData) {
  //     let mutateSlug = post.slug
  //
  //     if (post.type === 'devto') {
  //       // remove unique digit in devto slug
  //       mutateSlug = mutateSlug.replace(/-\w+$/, '')
  //     }
  //
  //     const { generateBlogImg, writeToFile: writeBlogImgToFile } = await import('../../scripts/generate-blog-img')
  //     const canvas = await generateBlogImg({ slug: mutateSlug, tags: post.tag_list })
  //     await writeBlogImgToFile(post.slug, canvas)
  //   }

  return { props: { data: sortedData } }
}
