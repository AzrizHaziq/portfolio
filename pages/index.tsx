import Head from 'next/head'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { PersonalData, PersonalDataProvider } from '@helpers'
import { Nav, HeroSection, Skills, IconBox } from '@components'

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
      <main className='max-w-7xl mx-auto'>
        <div
          className='flex flex-col justify-center items-center mx-auto space-y-4 max-w-4xl'
          style={{ height: `calc(100vh - ${arrowHeight} - ${navHeader})` }}>
          <HeroSection />
        </div>
        <div className='flex justify-center' style={{ height: arrowHeight }}>
          <IconBox icon='ArrowDown' className={'w-6 h-6 animate-bounce text-black dark:text-white'} />
        </div>
        <div className='mx-5'>
          <Skills />
        </div>
      </main>
      <div className='mb-[200px]' />
    </PersonalDataProvider>
  )
}
