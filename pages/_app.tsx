// import '@helpers/wdyr'
import '../styles/globals.scss'

import { v4 as uuid } from 'uuid'
import SEO from '../next-seo.config'
import { DefaultSeo } from 'next-seo'
import data from '../personal-data.json'
import type { AppProps } from 'next/app'
import App, { AppContext } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { PersonalData, PersonalDataProvider } from '@helper_client'

export default function MyApp({ Component, pageProps, PersonalData }: AppProps & { PersonalData: PersonalData }) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <ThemeProvider attribute='class' storageKey='theme' defaultTheme='system'>
        <PersonalDataProvider value={PersonalData}>
          <Component {...pageProps} />
        </PersonalDataProvider>
      </ThemeProvider>
    </>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)

  const mergedSkills = shuffle(data.skills).map(item => ({
    skill: item,
    id: uuid(),
    color: colors[random(0, colors.length)],
  }))

  return { ...appProps, PersonalData: { ...data, skills: mergedSkills } }
}

const colors = [
  'bg-yellow-100 text-yellow-600',
  'bg-red-200 text-red-600',
  'bg-blue-200 text-blue-600',
  'bg-green-200 text-green-600',
  'bg-pink-200 text-pink-600',
  'bg-cyan-200 text-cyan-600',
  'bg-lime-200 text-lime-600',
]

function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min)
}

const shuffle = (arr: any[]): any[] =>
  [...arr].reduceRight((res, _, __, s) => (res.push(s.splice(0 | (Math.random() * s.length), 1)[0]), res), [])
