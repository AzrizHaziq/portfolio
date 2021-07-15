import { v4 as uuid } from 'uuid'
import data from 'personal-data.json'
import { useEvent } from 'react-use'
import { PersonalDataProvider } from '@helpers'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { HeroSection, IconBox, Nav, Skills } from '@components'
import { useCallback, useEffect, useRef, useState } from 'react'

export const getStaticProps: GetStaticProps = async () => {
  const colors = [
    'bg-yellow-100 text-yellow-600',
    'bg-red-200 text-red-600',
    'bg-blue-200 text-blue-600',
    'bg-green-200 text-green-600',
    'bg-white text-black border-1 border-black',
  ]

  function random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min) + min)
  }

  const shuffle = (arr: any[]): any[] =>
    [...arr].reduceRight((res, _, __, s) => (res.push(s.splice(0 | (Math.random() * s.length), 1)[0]), res), [])

  const mergedSkills = shuffle(data.skills).map(item => ({
    skill: item,
    id: uuid(),
    color: colors[random(0, colors.length)],
  }))

  return { props: { data: { ...data, skills: mergedSkills } } }
}

const navHeader = '88px'
const arrowHeight = '6vh'
export default function Home({ data }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [arrowTop, setArrowTop] = useState<number>(0)
  const [showArrow, setShowArrow] = useState<boolean>(true)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setArrowTop(scrollRef.current?.getBoundingClientRect().top as number)
  }, [])

  const onScroll = useCallback(() => {
    const offset = 30
    const shouldHide = (scrollRef.current?.getBoundingClientRect().top as number) + offset > arrowTop
    setShowArrow(shouldHide)
  }, [arrowTop])

  useEvent('scroll', onScroll)

  return (
    <PersonalDataProvider value={data}>
      <Nav />
      <main className='max-w-7xl mx-auto'>
        <div
          className='flex flex-col justify-center items-center mx-auto space-y-4 max-w-4xl'
          style={{ height: `calc(100vh - ${arrowHeight} - ${navHeader})` }}>
          <HeroSection />
        </div>
        <div
          ref={scrollRef}
          className={`flex justify-center ${showArrow ? 'visible' : 'invisible'}`}
          style={{ height: arrowHeight }}>
          <IconBox icon='ArrowDown' className={'w-6 h-6 animate-bounce text-black dark:text-white'} />
        </div>
        <div className='mx-5'>
          <Skills />
        </div>
      </main>
      <div className='mb-[400px]' />
    </PersonalDataProvider>
  )
}
