import prism from 'prismjs'
import { useEffect } from 'react'
import { GetStaticProps } from 'next'
import { CustomPost, DevtoPost, ExtendHead, Nav } from '@components'
import { Devto, getDevto, getDevToBySlug } from '@helpers_server/get_devto'
import { Custom, getAllPosts, getSinglePost } from '@helpers_server/get_custom_post'

import 'prismjs/components/prism-css'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/themes/prism-tomorrow.css'

export default function BlogPost({ post }: { post: Devto.Post | Custom.Post }) {
  useEffect(() => {
    prism.highlightAll()
  }, [])

  return (
    <>
      <ExtendHead
        title={post.title}
        description={post.description}
        permalink={`${process.env.NEXT_PUBLIC_HOSTNAME}/blogs/${post.slug}`}
      />
      <Nav />
      <style global jsx>{`
        .dark .prose pre {
          background: #2d2d2d;
          color: #ccc;
        }
      `}</style>
      <main className='container max-w-xl px-5 mx-auto md:max-w-3xl'>
        {post.type === 'devto' ? <DevtoPost post={post} /> : <CustomPost post={post} />}
      </main>
    </>
  )
}

// @ts-ignore
export const getStaticProps: GetStaticProps<Devto.Post, { slug: string }> = async context => {
  const revalidate = 60 * 60
  const slug = context.params!.slug

  const post = (await getDevToBySlug(slug)) ?? (await getSinglePost(slug))

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
  const devtoPaths = await getDevto(({ slug }: Devto.FromResponse) => slug)
  const customPaths = await getAllPosts().map(pluck('slug'))

  return {
    paths: [...devtoPaths, ...customPaths].map(slug => ({ params: { slug } })),
    fallback: false,
  }
}
