import { Type } from './Type'
import { SocialLink, Langs } from './SocialLink'
import { useState } from 'react'

const whoami: string[] = [
  'programmer',
  '❤️ cats',
  'I hate JS',
  'Just kidding 🙂',
  '❤️  unit and e2e test',
  'Non stop learn something new',
]

export function HeroSection() {
  const [isShown, setShown] = useState<boolean>(false)

  return (
    <main className='flex' style={{ height: 'calc(100vh - 88px)' }}>
      <div className='flex flex-col justify-center mx-auto space-y-2 p-5'>
        <h1
          className='tracking-tight font-extrabold text-gray-900'
          style={{ fontSize: 'clamp(3em, calc(9 / 80 * 100vw), 5em)' }}>
          <span className='block text-black dark:text-white'>Hi 👋,</span>
          <div className='space-x-4'>
            <span className='inline text-black dark:text-white'>I'm</span>
            <div className='inline text-indigo-600'>Azriz Haziq Jasni</div>
          </div>
        </h1>
        <div className='flex space-x-3 mt-3 text-base text-gray-500'>
          <Type texts={whoami} showCallBack={() => setShown(true)} hideCallBack={() => setShown(false)} />
          <span className={`${isShown ? 'block' : 'hidden'}`}>
            <Langs />
          </span>
        </div>
        <SocialLink />
      </div>
    </main>
  )
}

/*

      <style>
        .hero-section {
        height: calc(100vh - 88px);
        grid-auto-rows: 1fr;
        @apply grid gap-2 grid-cols-1 md:grid-cols-2;
      }


        .main-section {

      }

      </style>
 */
