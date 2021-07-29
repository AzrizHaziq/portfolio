import Head from 'next/head'
import * as React from 'react'
import SEO from '../next-seo.config'
import { NextSeo, NextSeoProps } from 'next-seo'

// This comp add twitter seo tag, since next-seo didnt generate it
export function ExtendHead({
  permalink,
  title,
  description,
  children,
  ...rest
}: NextSeoProps & { children?: React.ReactNode; permalink?: string }) {
  permalink ??= process.env.VERCEL_URL as string
  const imgUrl = rest.openGraph?.images?.[0]?.url ?? SEO.openGraph?.images?.[0].url

  return (
    <>
      <NextSeo
        openGraph={{
          title,
          description,
        }}
        {...rest}
      />
      <Head>
        <title>{title}</title>
        <meta property='twitter:title' content={title} />
        <meta property='twitter:url' content={permalink} />
        <meta property='twitter:description' content={description} />
        <meta property='twitter:image' content={imgUrl} />
        <meta name='description' content={description} />
        <meta name='twitter:creator' content='@azrizhaziq' />
        <meta name='theme-color' content='#4137c4' />
        {children}
      </Head>
    </>
  )
}
