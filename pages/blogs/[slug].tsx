import prism from 'prismjs'
import matter from 'gray-matter'
import { useEffect } from 'react'
import { GetStaticProps } from 'next'
import { ExtendHead, Nav } from '@components'
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

  // console.log(post)
  return (
    <>
      <ExtendHead
        title={post.title}
        description={post.description}
        permalink={`${process.env.NEXT_PUBLIC_HOSTNAME}/blogs/${post.slug}`}
      />
      <Nav />
      <main className='max-w-xl md:max-w-3xl container mx-auto px-5'>
        <article className='prose lg:prose-xl text-white'>
          <header>
            <h3 className='publish-date'>{post.publishDate}</h3>
            <h1 className='title'>{post.title}</h1>
          </header>
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
  const markdown = sanitizeDevToMarkdown(post.body_markdown as string)
  const html = convertMarkdownToHtml(markdown)

  // console.log(html)

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
