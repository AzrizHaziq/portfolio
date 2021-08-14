import Head from 'next/head'
import * as React from 'react'

type AdditionalProps = Partial<{
  title: string
  published_timestamp?: string
  description: string
  url: string
  type: 'article' | 'website' | 'blog'
  imgUrl: string
  imgAlt?: string
}>

export const SEOMetadata = {
  title: "👋🏼, I'm Azriz Haziq Jasni",
  description: 'Welcome to my website, hope you enjoy',
  type: 'website',
  locale: 'en_us',
  site_name: 'Azriz Haziq',
  image: {
    url: `/assets/routes/home.png`,
    alt: 'About Azriz haziq',
  },
  twitter: {
    handle: '@azrizhaziq',
    cardType: 'summary_large_image',
  },
} as const

export function ExtendHead({
  url = '/',
  type = 'website',
  title = SEOMetadata.title,
  description = SEOMetadata.description,
  imgUrl = SEOMetadata.image.url,
  imgAlt = SEOMetadata.image.alt,
  published_timestamp,
  children,
}: AdditionalProps & { children?: React.ReactNode; permalink?: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ? process.env.NEXT_PUBLIC_BASE_URL : 'http://localhost:3000'
  const fullUrl = `${baseUrl}${url}`

  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta content={description} name='description' />

      <meta property='og:title' content={title} />
      <meta property='og:type' content={type} />
      <meta property='og:url' content={`${fullUrl}`} />
      <meta property='og:image' content={`${baseUrl}${imgUrl}`} />
      <meta property='og:image:alt' content={imgAlt} />

      <meta property='og:site_name' content={SEOMetadata.site_name} />
      <meta property='og:description' content={description} />
      <meta property='og:locale' content={SEOMetadata.locale} />

      <meta name='twitter:title' content={title} />
      <meta property='twitter:url' content={`${fullUrl}`} />
      <meta name='twitter:card' content={SEOMetadata.twitter.cardType} />
      <meta name='twitter:site' content={SEOMetadata.twitter.handle} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={`${baseUrl}${imgUrl}`} />
      {published_timestamp && <meta property='article:published_time' content={published_timestamp} />}
      {children}
    </Head>
  )
}
