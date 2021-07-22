import { GetStaticProps } from 'next'
import { DevToPost, ExtendHead, Nav } from '@components'
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
      <main className='max-w-xl md:max-w-3xl container mx-auto px-5'>
        <section className='py-10'>
          <ul className='-my-8 divide-y-2 divide-gray-200 dark:divide-gray-800'>
            {data.map(post => (
              <li key={post.id}>{post.type === 'devto' ? <DevToPost post={post} /> : null}</li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}
