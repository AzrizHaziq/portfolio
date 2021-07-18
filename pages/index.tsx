import { useEvent } from 'react-use'
import { useCallback, useRef, useState } from 'react'
import { SocialLink, HeroSection, IconBox, Nav, Skills } from '@components'

const navHeader = '88px'
const arrowHeight = '6vh'
const minHeight = `calc(100vh - ${arrowHeight} - ${navHeader} - 40px)`

export default function Home() {
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
      <Nav />
      <main className='max-w-7xl mx-auto'>
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
          <IconBox icon='ArrowDown' className={'w-6 h-6 animate-bounce text-black dark:text-white'} />
        </div>
        <div className='mx-5 mb-10 md:mb-0 flex items-center flex-col justify-center' style={{ minHeight }}>
          <Skills />
        </div>
      </main>
    </>
  )
}
