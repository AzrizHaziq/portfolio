import { GetServerSideProps } from 'next'
import { getServerSideSitemap, ISitemapField } from 'next-sitemap'
import { getAllPostSortedByDate } from '@helpers/server/get_all_posts'

export const getServerSideProps: GetServerSideProps = async ctx => {
  const sortedData = await getAllPostSortedByDate()

  const fields: ISitemapField[] = sortedData.map(blog => ({
    loc: `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${blog.slug}`,
    lastmod: new Date(blog.published_timestamp).toISOString(),
  }))

  return getServerSideSitemap(ctx, fields)
}

export default function Site() {}
