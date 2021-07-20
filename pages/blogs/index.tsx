import { NextSeo } from 'next-seo'
import { GetStaticProps } from 'next'
import { DevToPost, Nav } from '@components'
import { Devto_Post, getDevto } from '@helpers'

export async function getStaticProps(context: GetStaticProps) {
  const data = await getDevto(({ id, title, url, description, slug, published_timestamp, tag_list, cover_image }) => ({
    id,
    title,
    description,
    slug,
    published_timestamp,
    tag_list,
    url,
    cover_image,
  }))

  return { props: { data } }
}

export default function Index({ data }: { data: Devto_Post[] }) {
  return (
    <>
      <NextSeo
        openGraph={{
          title: 'List of my blog posts',
          description: 'Do share the post if you find interesting',
          images: [{ url: `${process.env.NEXT_PUBLIC_HOSTNAME}/assets/routes/blogs.png`, alt: 'Side Projects' }],
        }}
      />
      <Nav />
      <main className='max-w-xl md:max-w-3xl container mx-auto px-5'>
        <section className='py-10'>
          <ul className='-my-8 divide-y-2 divide-gray-300 dark:divide-gray-800'>
            {data.map(post => (
              <li key={post.id}>{post.type === 'devto' ? <DevToPost post={post} /> : null}</li>
            ))}
          </ul>
        </section>
      </main>
    </>
  )
}
