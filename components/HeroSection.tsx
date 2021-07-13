import { Type } from './Type'
import { useState } from 'react'
import { SocialLink, Langs } from './SocialLink'
import { useHi, usePersonalData } from '@helpers'

export function HeroSection() {
  const hi = useHi()
  const { alias, whoami } = usePersonalData()
  const [isShown, setShown] = useState<boolean>(false)

  return (
    <>
      <h1
        className='tracking-tight font-extrabold text-gray-900'
        style={{ fontSize: 'clamp(3em, calc(9 / 80 * 100vw), 5em)' }}>
        <span className='block text-black dark:text-white'>Hi {hi}</span>
        <div className='space-x-4'>
          <span className='inline text-black dark:text-white'>I'm</span>
          <div className='inline text-indigo-600'>{alias}</div>
        </div>
      </h1>
      <div className='flex space-x-3 mt-3 text-base text-gray-500'>
        <Type texts={whoami} showCallBack={() => setShown(true)} hideCallBack={() => setShown(false)} />
        <span className={`${isShown ? 'block' : 'hidden'}`}>
          <Langs />
        </span>
      </div>
      <SocialLink />
    </>
  )
}
