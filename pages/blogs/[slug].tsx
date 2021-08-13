import prism from 'prismjs'
import { useEffect } from 'react'
import { GetStaticProps } from 'next'
import { useTrackPage } from '@helpers/analytics'
import { CustomPost, DevtoPost, ExtendHead, Nav } from '@components'
import { Custom, getSinglePost, Devto, getDevto, getDevToBySlug, getAllCustomPosts } from '@helpers/server'

import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'

export default function BlogPost({ post }: { post: Devto.Post | Custom.Post }) {
  useTrackPage({ title: post.title, path: `/blogs/${post.slug}` })

  useEffect(() => {
    prism.highlightAll()
  }, [])

  return (
    <>
      <ExtendHead
        type='article'
        url={`/blogs/${post.slug}`}
        title={post.title}
        description={post.description}
        published_timestamp={post.published_timestamp as string}
        imgUrl={`/assets/blogs/${post.slug}.png`}
        imgAlt={post.title}>
        <meta property='article:section' content='Technology' />
        <meta name='keywords' content={post.tag_list.join(', ')} />
        {post.tag_list.map((tag, index) => (
          <meta key={index} property='article:tag' content={tag} />
        ))}
      </ExtendHead>
      <Nav />
      <main className='container max-w-xl px-5 mx-auto md:max-w-3xl'>
        <style global jsx>{`
          .dark .prose pre {
            background: #2d2d2d;
            color: #ccc;
          }
        `}</style>
        {post.type === 'devto' ? <DevtoPost post={post} /> : <CustomPost post={post} />}
      </main>
    </>
  )
}

// @ts-ignore
export const getStaticProps: GetStaticProps<Devto.Post, { slug: string }> = async context => {
  const revalidate = 60 * 60
  const slug = context.params!.slug

  const post = (await getDevToBySlug(slug)) || (await getSinglePost(slug))

  if (post) {
    return {
      props: { post },
      revalidate,
    }
  }

  return { redirect: '/404' }
}

export async function getStaticPaths() {
  const pluck = (key: string) => (item: any) => item[key]
  const customPaths = getAllCustomPosts().map(pluck('slug'))
  const devtoPaths = await getDevto(({ slug }: Devto.FromResponse) => slug)

  return {
    paths: [...devtoPaths, ...customPaths].map(slug => ({ params: { slug } })),
    fallback: false,
  }
}
