import '@helpers/wdyr'
import '../styles/globals.scss'

import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { PersonalDataProvider } from '@helper_client'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute='class' storageKey='theme' defaultTheme='system'>
      <PersonalDataProvider>
        <Component {...pageProps} />
      </PersonalDataProvider>
    </ThemeProvider>
  )
}
