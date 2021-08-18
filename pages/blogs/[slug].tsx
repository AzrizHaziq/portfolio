import prism from 'prismjs'
import Image from 'next/image'
import type { GetStaticProps } from 'next'
import { Post } from '@helpers/server/post'
import React, { useEffect, useMemo } from 'react'
import { getMDXComponent } from 'mdx-bundler/client'
import { getDevToBySlug } from '@helpers/server/get_devto'
import { trackEvent, useTrackPage } from '@helpers/analytics'
import { getSinglePost } from '@helpers/server/get_custom_post'
import { getAllPostSortedByDate } from '@helpers/server/get_all_posts'
import { ExtendHead, IconBox, ImgSkeleton, Metadata, Nav } from '@components'

import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'

export default function BlogPost({ post }: { post: Post.Devto | Post.Custom }) {
  const Component = useMemo(() => getMDXComponent(post.code), [post.code])
  const handleClick = () => trackEvent('blog_devto_read_external', { category: 'blog', label: post.title })

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

      {post.cover_image && (
        <Image
          layout='responsive'
          width='100%'
          placeholder='blur'
          blurDataURL={ImgSkeleton()}
          height={35}
          src={post.cover_image}
          alt={post.title}
          objectFit='cover'
        />
      )}

      <main className='container max-w-xl px-5 mx-auto md:max-w-3xl'>
        <style global jsx>{`
          .dark .prose pre {
            background: #2d2d2d;
            color: #ccc;
          }

          h1,
          h2,
          h3,
          h4,
          h5,
          h6 {
            scroll-margin-top: 100px;
          }

          :where(h1, h2, h3, h4, h5, h6):target a[href^='#']::before {
            opacity: 100;
          }

          :where(h1, h2, h3, h4, h5, h6):hover a[href^='#']::before {
            opacity: 100;
          }

          :where(h1, h2, h3, h4, h5, h6) a[href^='#']::before {
            opacity: 0;
            content: '#';
            position: absolute;
            left: -30px;
          }

          :where(h1, h2, h3, h4, h5, h6) a[href^='#'] {
            text-decoration: none;
          }

          html {
            scroll-behavior: smooth;
            scroll-snap-type: y mandatory;
          }
        `}</style>

        {/* devto banner info */}
        {post.type === 'devto' && (
          <a
            href={post.url}
            target='_blank'
            rel='noopener noreferrer'
            onClick={handleClick}
            className='flex p-3 mt-5 bg-indigo-200 border-2 border-indigo-400 border-dashed rounded dark:bg-indigo-100 dark:text-black md:items-center group space-x-1 hover:shadow-md'>
            <IconBox icon='Devto' className='hidden w-10 h-10 md:block' title='Read this article at Devto website' />
            <div className='flex flex-col'>
              <span>Read this article at Devto Website</span>
              <small>
                Few of below content does not render properly so instead of reading here, you can read this in Devto
                instead.
              </small>
            </div>
          </a>
        )}

        <article className='prose lg:prose-xl'>
          <header>
            <h1 className='flex !my-2 space-x-2'>{post.title}</h1>
          </header>
          <Metadata
            tag_list={post.tag_list}
            reading_time={post.reading_time.text}
            published_timestamp={post.published_timestamp as string}
          />
          <Component />
        </article>
      </main>
    </>
  )
}

// @ts-ignore
export const getStaticProps: GetStaticProps<Post.Devto, { slug: string }> = async context => {
  const revalidate = 60 * 60 * 24
  const slug = context.params!.slug

  const post = (await getDevToBySlug(slug)) ?? (await getSinglePost(slug))

  if (post) {
    return { props: { post }, revalidate }
  }

  return { redirect: '/404' }
}

export async function getStaticPaths() {
  const sortedData = await getAllPostSortedByDate()

  return {
    paths: sortedData.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  }
}
