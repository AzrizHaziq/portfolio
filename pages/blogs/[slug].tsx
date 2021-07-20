import { Nav } from '@components'
import { NextSeo } from 'next-seo'
import { Devto_Post } from '@helpers'
import { Params } from 'next/dist/next-server/server/router'

export default function BlogPost({ post }: any) {
  console.log(post)
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
      <main className='max-w-xl md:max-w-3xl container mx-auto px-5'>inner blog</main>
    </>
  )
}

export async function getStaticProps({ params }: Params) {
  // const post = getPostBySlug(params.slug, ['title', 'date', 'slug', 'author', 'content', 'ogImage', 'coverImage'])
  // const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        title: '123',
        description: '213123123123',
      },
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          slug: '123',
        },
      },
    ],
    fallback: false,
  }
}

// export async function getStaticProps({ params }: Params) {
//   const post = getPostBySlug(params.slug, [
//     'title',
//     'date',
//     'slug',
//     'author',
//     'content',
//     'ogImage',
//     'coverImage',
//   ])
//   const content = await markdownToHtml(post.content || '')
//
//   return {
//     props: {
//       post: {
//         ...post,
//         content,
//       },
//     },
//   }
// }
//
// export async function getStaticPaths() {
//   const posts = getAllPosts(['slug'])
//
//   return {
//     paths: posts.map((posts) => {
//       return {
//         params: {
//           slug: posts.slug,
//         },
//       }
//     }),
//     fallback: false,
//   }
// }
