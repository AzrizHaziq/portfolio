import data from './personal-data.json'
import { DefaultSeoProps } from 'next-seo/lib/types'

const NextSeo: DefaultSeoProps = {
  openGraph: {
    title: "Hi, 'm Azriz Haziq Jasni",
    description: 'Welcome to my website, hope you enjoy',
    type: 'website',
    locale: 'en_us',
    url: process.env.VERCEL_URL,
    site_name: data.alias,
    images: [{ url: `${process.env.VERCEL_URL}/assets/routes/Home.png`, alt: 'Azriz Haziq Jasni' }],
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
      href: '/android-chrome-192x192.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      href: '/android-chrome-512x512.png',
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
} as const

export default NextSeo
