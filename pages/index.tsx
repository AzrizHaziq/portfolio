import { useEvent } from 'react-use'
import { useCallback, useRef, useState } from 'react'
import { HeroSection, IconBox, Nav, Skills } from '@components'

const navHeader = '88px'
const arrowHeight = '6vh'

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
        <div
          className='mx-5 flex items-center flex-col justify-center'
          style={{ height: `calc(100vh - ${arrowHeight} - ${navHeader})` }}>
          <Skills />
        </div>
      </main>
    </>
  )
}
