import { GetServerSideProps } from 'next'
import { getAllPostSortedByDate } from '@helpers/server'
import { getServerSideSitemap, ISitemapField } from 'next-sitemap'

export const getServerSideProps: GetServerSideProps = async ctx => {
  const sortedData = await getAllPostSortedByDate()

  const fields: ISitemapField[] = sortedData.map(blog => ({
    loc: `${process.env.URL}/blogs/${blog.slug}`,
    lastmod: new Date(blog.published_timestamp).toISOString(),
  }))

  return getServerSideSitemap(ctx, fields)
}

export default function Site() {}
