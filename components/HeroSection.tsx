import { Type } from './Type'
import { useState } from 'react'
import { Langs } from '@components'
import { useHi, usePersonalData } from '@feHelpers'

export function HeroSection() {
  const hi = useHi()
  const { alias, whoami } = usePersonalData()
  const [isShown, setShown] = useState<boolean>(false)

  return (
    <>
      <h1
        className='tracking-tight font-extrabold text-gray-900'
        style={{ fontSize: 'clamp(3em, calc(9 / 80 * 100vw), 5em)' }}>
        <span className='block text-black dark:text-white text-center md:text-left'>Hi {hi}</span>
        <div className='space-x-4'>
          <span className='text-black dark:text-white hidden sm:inline'>Im</span>
          <div className='inline text-indigo-600'>{alias}</div>
        </div>
      </h1>
      <div className='flex text-base text-gray-500'>
        <Type texts={whoami} showCallBack={() => setShown(true)} hideCallBack={() => setShown(false)} />
        <span className={`${isShown ? 'block' : 'hidden'}`}>
          <Langs />
        </span>
      </div>
    </>
  )
}
