import { GetStaticProps } from 'next'
import { DevtoPostList, ExtendHead, Nav } from '@components'
import { Devto, frequentDevtoMapper, getDevto } from '@beHelpers'

export async function getStaticProps(context: GetStaticProps) {
  const data = await getDevto(frequentDevtoMapper)
  const permalink = `${process.env.NEXT_PUBLIC_HOSTNAME}/blogs`

  return { props: { data, permalink } }
}

export default function Index({ data, permalink }: { data: Devto.Post[]; permalink: string }) {
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
              <li key={post.id}>{post.type === 'devto' ? <DevtoPostList post={post} /> : null}</li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}
