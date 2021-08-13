import Link from 'next/link'
import { useEvent } from 'react-use'
import { useTrackPage } from '@helpers/analytics'
import { useCallback, useRef, useState } from 'react'
import { IconBox, SocialLink, HeroSection, Nav, Skills, ExtendHead } from '@components'

const navHeader = '88px'
const arrowHeight = '6vh'
const minHeight = `calc(100vh - ${arrowHeight} - ${navHeader} - 40px)`

export default function Home() {
  useTrackPage({ title: 'home', path: '/' })

  const scrollRef = useRef<HTMLDivElement>(null)
  const [showArrow, setShowArrow] = useState<boolean>(true)

  const onScroll = useCallback(() => {
    const shouldHide =
      (scrollRef.current?.getBoundingClientRect().top as number) - document.documentElement.scrollTop > 200
    setShowArrow(shouldHide)
  }, [])

  useEvent('scroll', onScroll)

  return (
    <>
      <ExtendHead />
      <Nav />
      <main>
        <div className='mx-auto max-w-7xl'>
          <div style={{ minHeight }} className='flex flex-col justify-evenly'>
            <div className='flex justify-center mt-10'>
              <SocialLink />
            </div>
            <div className='flex flex-col items-center justify-center'>
              <HeroSection />
            </div>
          </div>
          <div
            ref={scrollRef}
            className={`flex justify-center ${showArrow ? 'visible' : 'invisible'}`}
            style={{ height: arrowHeight }}>
            <IconBox icon='ArrowDown' className={'w-6 h-6 animate-bounce text-black'} />
          </div>
        </div>
        <div
          className='flex flex-col items-center justify-center w-full text-center text-indigo-200 bg-indigo-500'
          style={{ minHeight }}>
          <h2 className='mb-1 text-xs font-medium tracking-widest text-indigo-100 title-font'>Javascript developer</h2>
          <h1 className='mb-4 text-2xl font-bold sm:text-3xl title-font'>Mohd Azriz Haziq Jasni</h1>
          <div className='mx-auto text-base leading-relaxed lg:w-2/3 dark:text-white'>
            <p>Hey thanks for visiting, this is the place where you can find my</p>
            <Link href='/side-projects'>
              <a className={'underline opacity-80 hover:opacity-100'}>side-projects</a>
            </Link>{' '}
            and{' '}
            <Link href='/blogs'>
              <a className={'underline opacity-80 hover:opacity-100'}>blogs</a>
            </Link>
            . Hope you enjoy it and do share with others 🙂.
          </div>
        </div>
        <div className='px-5 py-10 mx-auto max-w-7xl'>
          <div className='flex flex-col items-center justify-center' style={{ minHeight }}>
            <Skills />
          </div>
        </div>
      </main>
    </>
  )
}
