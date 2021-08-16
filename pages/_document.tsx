import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang='en'>
        <Head>
          <meta charSet='utf-8' />
          <meta name='robots' content='index,follow' />

          <link rel='manifest' href='/manifest.json' />
          <link
            rel='apple-touch-icon-precomposed'
            sizes='57x57'
            href='https://azrizhaziq.com/apple-touch-icon-57x57.png'
          />
          <link
            rel='apple-touch-icon-precomposed'
            sizes='114x114'
            href='https://azrizhaziq.com/apple-touch-icon-114x114.png'
          />
          <link
            rel='apple-touch-icon-precomposed'
            sizes='72x72'
            href='https://azrizhaziq.com/apple-touch-icon-72x72.png'
          />
          <link
            rel='apple-touch-icon-precomposed'
            sizes='144x144'
            href='https://azrizhaziq.com/apple-touch-icon-144x144.png'
          />
          <link
            rel='apple-touch-icon-precomposed'
            sizes='60x60'
            href='https://azrizhaziq.com/apple-touch-icon-60x60.png'
          />
          <link
            rel='apple-touch-icon-precomposed'
            sizes='120x120'
            href='https://azrizhaziq.com/apple-touch-icon-120x120.png'
          />
          <link
            rel='apple-touch-icon-precomposed'
            sizes='76x76'
            href='https://azrizhaziq.com/apple-touch-icon-76x76.png'
          />
          <link
            rel='apple-touch-icon-precomposed'
            sizes='152x152'
            href='https://azrizhaziq.com/apple-touch-icon-152x152.png'
          />
          <link rel='icon' type='image/png' href='static/favicon-196x196.png' sizes='196x196' />
          <link rel='icon' type='image/png' href='static/favicon-96x96.png' sizes='96x96' />
          <link rel='icon' type='image/png' href='static/favicon-32x32.png' sizes='32x32' />
          <link rel='icon' type='image/png' href='static/favicon-16x16.png' sizes='16x16' />
          <link rel='icon' type='image/png' href='static/favicon-128.png' sizes='128x128' />
          <meta name='application-name' content='azrizhaziq' />
          <meta name='msapplication-TileColor' content='#4137C4' />
          <meta name='msapplication-TileImage' content='static/mstile-144x144.png' />
          <meta name='msapplication-square70x70logo' content='static/mstile-70x70.png' />
          <meta name='msapplication-square150x150logo' content='static/mstile-150x150.png' />
          <meta name='msapplication-wide310x150logo' content='static/mstile-310x150.png' />
          <meta name='msapplication-square310x310logo' content='static/mstile-310x310.png' />

          <meta content='#4137c4' name='theme-color' />
          <meta content='#4137c4' name='msapplication-TileColor' />
        </Head>
        <body className='bg-indigo-50 dark:bg-gray-900'>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
