import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta charSet='utf-8' />
          <meta name='robots' content='index,follow' />
          <meta name='viewport' content='width=device-width' />
          <link rel='shortcut icon' type='image/x-icon' href='/favicon.ico' />
          <link rel='icon' type='image/png' href='/android-chrome-192x192.png' />
          <link rel='icon' type='image/png' href='/android-chrome-512x512.png' />
          <link rel='icon' type='image/png' href='/favicon-32x32.png' />
          <link rel='icon' type='image/png' href='/favicon-16x16.png' />
          <link rel='manifest' href='/manifest.json' />
          <link rel='apple-touch-icon' href='/apple-touch-icon.png' sizes='76x76' />
          <meta content='#a5b4fc' name='theme-color' />
          <meta content='#a5b4fc' name='msapplication-TileColor' />
        </Head>
        <body className='bg-indigo-50 dark:bg-gray-900'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
