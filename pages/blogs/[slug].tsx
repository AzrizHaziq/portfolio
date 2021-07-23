import prism from 'prismjs'
import matter from 'gray-matter'
import { useEffect } from 'react'
import { GetStaticProps } from 'next'
import { ExtendHead, Nav, DevtoPost } from '@components'
import { Devto, getDevto, getDevToBySlug } from '@beHelpers'
import { convertMarkdownToHtml, sanitizeDevToMarkdown } from '@helpers/markdown'

import 'prismjs/components/prism-css'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/themes/prism-tomorrow.css'

export default function BlogPost({ post }: any) {
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
      <style jsx>{`
        .dark .prose pre {
          background: #2d2d2d;
          color: #ccc;
        }
      `}</style>
      <main className='max-w-xl md:max-w-3xl container mx-auto px-5'>
        {post.type === 'devto' ? <DevtoPost post={post} /> : null}
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
  const markdown = sanitizeDevToMarkdown(post.body_markdown as string)
  const html = convertMarkdownToHtml(markdown)

  return {
    props: { post: { ...post, body_markdown: html, frontMatter } },
    revalidate: 60 * 60,
  }
}

export async function getStaticPaths() {
  const paths = await getDevto(({ slug }: Devto.FromResponse) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}
