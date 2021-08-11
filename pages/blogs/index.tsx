import { GetStaticProps } from 'next'
import { useTrackPage } from '@helpers/analytics'
import { Devto, getAllPostSortedByDate } from '@helpers/server'
import { CustomPostList, DevtoPostList, ExtendHead, Nav } from '@components'
import { generateBlogImg, writeToFile as writeBlogImgToFile } from '@helpers/server/generate-blog-img'

export default function Index({ data, permalink }: { data: Devto.Post[]; permalink: string }) {
  useTrackPage({ title: 'blogs', path: '/blogs' })

  return (
    <>
      <ExtendHead
        permalink={permalink}
        title='Enjoy reading 😀'
        description='Do share the post if you find interesting'
        openGraph={{
          images: [{ url: `${process.env.VERCEL_URL}/assets/routes/blogs.png`, alt: 'Side Projects' }],
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
  const permalink = `${process.env.VERCEL_URL}/blogs`
  const sortedData = await getAllPostSortedByDate()

  for (let post of sortedData) {
    let mutateSlug = post.slug

    if (post.type === 'devto') {
      // remove unique digit in devto slug
      mutateSlug = mutateSlug.replace(/-\w+$/, '')
    }

    const canvas = await generateBlogImg({ slug: mutateSlug, tags: post.tag_list })
    await writeBlogImgToFile(post.slug, canvas)
  }

  return { props: { data: sortedData, permalink } }
}
