import Head from 'next/head'
import * as React from 'react'
import { usePersonalData } from '@helpers'

interface BaseHead {
  title: string
  description: string
  permalink: string
  children?: JSX.Element
}

export function BaseHead({ title, description, permalink, children }: Partial<BaseHead>) {
  const personalData = usePersonalData()

  title = title ?? personalData.alias
  description = description ?? `I'm Azriz Haziq Jasni, a web developer`
  permalink = permalink ?? 'asdasd' //`${process.env.HOSTNAME}`
  console.log(process.env.HOSTNAME, process.env.NEXT_PUBLIC_ANALYTICS_ID)

  return (
    <Head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1, viewport-fit=cover' />

      <link rel='apple-touch-icon' sizes='57x57' href='/favicons/apple-icon-57x57.png' />
      <link rel='apple-touch-icon' sizes='60x60' href='/favicons/apple-icon-60x60.png' />
      <link rel='apple-touch-icon' sizes='72x72' href='/favicons/apple-icon-72x72.png' />
      <link rel='apple-touch-icon' sizes='76x76' href='/favicons/apple-icon-76x76.png' />
      <link rel='apple-touch-icon' sizes='114x114' href='/favicons/apple-icon-114x114.png' />
      <link rel='apple-touch-icon' sizes='120x120' href='/favicons/apple-icon-120x120.png' />
      <link rel='apple-touch-icon' sizes='144x144' href='/favicons/apple-icon-144x144.png' />
      <link rel='apple-touch-icon' sizes='152x152' href='/favicons/apple-icon-152x152.png' />
      <link rel='apple-touch-icon' sizes='180x180' href='/favicons/apple-icon-180x180.png' />
      <link rel='icon' type='image/png' sizes='192x192' href='/favicons/android-icon-192x192.png' />
      <link rel='icon' type='image/png' sizes='32x32' href='/favicons/favicon-32x32.png' />
      <link rel='icon' type='image/png' sizes='96x96' href='/favicons/favicon-96x96.png' />
      <link rel='icon' type='image/png' sizes='16x16' href='/favicons/favicon-16x16.png' />
      <meta name='msapplication-TileColor' content='#ffffff' />
      <meta name='msapplication-TileImage' content='/favicons/ms-icon-144x144.png' />
      <meta name='theme-color' content='#ffffff' />
      <meta name='theme-color' content='#000000' />

      <title>{title}</title>
      <meta name='title' content={title} />
      <meta name='description' content={description} />

      <meta property='og:type' content='website' />
      <meta property='og:url' content={permalink} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content='https://astro.build/social.jpg?v=1' />

      <meta property='twitter:card' content='summary_large_image' />
      <meta property='twitter:url' content={permalink} />
      <meta property='twitter:title' content={title} />
      <meta property='twitter:description' content={description} />
      <meta property='twitter:image' content='https://astro.build/social.jpg?v=1' />
      {children}
    </Head>
  )
}
