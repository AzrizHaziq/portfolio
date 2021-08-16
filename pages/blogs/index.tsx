import { GetStaticProps } from 'next'
import { useTrackPage } from '@helpers/analytics'
import { Devto } from '@helpers/server/get_devto'
import { getAllPostSortedByDate } from '@helpers/server'
import { CustomPostList, DevtoPostList, ExtendHead, Nav } from '@components'

export default function Index({ data }: { data: Devto.Post[] }) {
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
  const sortedData = await getAllPostSortedByDate()

  // generate images for /blog/:slug
  if (process.env.SHOULD_GENERATE_IMG && process.env.NODE_ENV === 'development')
    for (let post of sortedData) {
      let mutateSlug = post.slug

      if (post.type === 'devto') {
        // remove unique digit in devto slug
        mutateSlug = mutateSlug.replace(/-\w+$/, '')
      }

      const { generateBlogImg, writeToFile: writeBlogImgToFile } = await import('@helpers/server/generate-blog-img')
      const canvas = await generateBlogImg({ slug: mutateSlug, tags: post.tag_list })
      await writeBlogImgToFile(post.slug, canvas)
    }

  return { props: { data: sortedData } }
}
