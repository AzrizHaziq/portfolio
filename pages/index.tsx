import { Nav, HeroSection, Skills, Icons } from '@components'

export default function Home() {
  const navHeader = '88px'
  const arrowHeight = '6vh'

  return (
    <>
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
    </>
  )
}
