import matter from 'gray-matter'
import { Nav } from '@components'
import { NextSeo } from 'next-seo'
import { GetStaticProps } from 'next'
import { Devto, getDevto, getDevToBySlug } from '../../helpers/devto/get_devto'

export default function BlogPost({ post }: any) {
  // console.log(post)
  return (
    <>
      <NextSeo
        openGraph={{
          title: 'abc',
          description: 'def',
          images: [{ url: `${process.env.NEXT_PUBLIC_HOSTNAME}/assets/routes/blogs.png`, alt: 'Side Projects' }],
        }}
      />
      <Nav />
      <main className='max-w-xl md:max-w-3xl container mx-auto px-5'>
        <article className='prose lg:prose-xl text-white'>
          <div dangerouslySetInnerHTML={{ __html: post.body_markdown }} />
        </article>
      </main>
    </>
  )
}

// @ts-ignore
export const getStaticProps: GetStaticProps<Devto.Post, { slug: string }> = async context => {
  const slug = context.params!.slug
  const post = await getDevToBySlug(slug)

  if (!post) {
    return { redirect: '/404' }
  }

  const { content, data: frontMatter } = matter(post.body_markdown as string)

  return {
    props: { post: { ...post, body_markdown: content, frontMatter } },
    revalidate: 60 * 60,
  }
}

export async function getStaticPaths() {
  const paths = await getDevto(({ slug }: Devto.FromResponse) => ({ params: { slug } }))

  return {
    paths: [...paths, { params: { slug: '123' } }],
    fallback: false,
  }
}
