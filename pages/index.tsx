import Head from 'next/head'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { Nav, HeroSection, Skills, Icons } from '@components'
import { PersonalData, PersonalDataProvider } from '@helpers'

const revalidate = 60 * 60

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(`${process.env.HOSTNAME}/api/personal-data`)
  const data: PersonalData = await res.json()
  return { props: { data }, revalidate }
}

export default function Home({ data }: InferGetStaticPropsType<typeof getStaticProps>) {
  const navHeader = '88px'
  const arrowHeight = '6vh'

  return (
    <PersonalDataProvider value={data}>
      <Head>
        <title>{data.alias}</title>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' />
        <link href='https://fonts.googleapis.com/css2?family=Anton&display=swap' rel='stylesheet' />
      </Head>
      <Nav />
      <main className='max-w-7xl mx-auto space-y-6'>
        <div
          className='flex flex-col justify-center mx-auto space-y-2 max-w-4xl'
          style={{ height: `calc(100vh - ${arrowHeight} - ${navHeader})` }}>
          <HeroSection />
        </div>
        <div className='flex justify-center' style={{ height: arrowHeight }}>
          {Icons.ArrowDown({ props: { className: 'w-6 h-6 animate-bounce text-black dark:text-white' } })}
        </div>
        <Skills />
      </main>
    </PersonalDataProvider>
  )
}
