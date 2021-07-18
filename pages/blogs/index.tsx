import { Nav } from '@components'
import { NextSeo } from 'next-seo'

export default function Blogs() {
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
      <main className='max-w-7xl mx-auto'>Blogs</main>
      <div className='mb-[400px]' />
    </>
  )
}
