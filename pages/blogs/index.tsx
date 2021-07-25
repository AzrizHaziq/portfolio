import { GetStaticProps } from 'next'
import { getAllPosts } from '@helpers/server/get_custom_post'
import { CustomPostList, DevtoPostList, ExtendHead, Nav } from '@components'
import { Devto, frequentDevtoMapper, getDevto } from '@helpers_server/get_devto'
import { useTrackPage } from '@helpers/analytics'

export default function Index({ data, permalink }: { data: Devto.Post[]; permalink: string }) {
  useTrackPage({ title: 'blogs', path: '/blogs' })

  return (
    <>
      <ExtendHead
        permalink={permalink}
        title='Enjoy reading 😀'
        description='Do share the post if you find interesting'
        openGraph={{
          images: [{ url: `${process.env.NEXT_PUBLIC_HOSTNAME}/assets/routes/blogs.png`, alt: 'Side Projects' }],
        }}
      />
      <Nav />
      <main className='container max-w-xl px-5 mx-auto md:max-w-3xl'>
        <section className='py-10'>
          <ul className='-my-8 divide-y-2 divide-gray-200 dark:divide-gray-800'>
            {data.map(post => (
              <li key={post.id}>
                {post.type === 'devto' ? <DevtoPostList post={post} /> : <CustomPostList post={post} />}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}

export async function getStaticProps(context: GetStaticProps) {
  const customPosts = getAllPosts()
  const devtoPosts = await getDevto(frequentDevtoMapper)
  const permalink = `${process.env.NEXT_PUBLIC_HOSTNAME}/blogs`

  const sortedData = [...customPosts, ...devtoPosts].sort(
    // @ts-ignore
    (a, b) => new Date(b.published_timestamp) - new Date(a.published_timestamp),
  )

  return { props: { data: sortedData, permalink } }
}
