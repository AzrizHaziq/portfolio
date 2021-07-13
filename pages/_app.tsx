import '../styles/globals.scss'

import Head from 'next/head'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { data, PersonalDataContext } from '@helpers'

function MyApp({ Component, pageProps }: AppProps) {
  const { name } = data

  return (
    <>
      <Head>
        <title>{name}</title>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link href='https://fonts.googleapis.com/css2?family=Anton&display=swap' rel='stylesheet' />
      </Head>
      <PersonalDataContext.Provider value={data}>
        <ThemeProvider attribute='class'>
          <Component {...pageProps} />
        </ThemeProvider>
      </PersonalDataContext.Provider>
    </>
  )
}

export default MyApp
