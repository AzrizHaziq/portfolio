import data from './personal-data.json'
import { DefaultSeoProps } from 'next-seo/lib/types'

const NextSeo: DefaultSeoProps = {
  openGraph: {
    type: 'website',
    locale: 'en_us',
    url: process.env.NEXT_PUBLIC_HOSTNAME,
    site_name: data.alias,
    images: [{ url: `${process.env.NEXT_PUBLIC_HOSTNAME}/routes/home.png`, alt: 'Azriz Haziq Jasni' }],
  },
  twitter: {
    handle: '@azrizhaziq',
    site: '@',
    cardType: 'summary_large_image',
  },
  additionalLinkTags: [
    {
      rel: 'shortcut icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon-192x192.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon-512x512.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
      sizes: '76x76',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
  ],
}

export default NextSeo
