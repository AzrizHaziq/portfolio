import React, { useEffect } from 'react'
import Typewriter from 'typewriter-effect/dist/core'

export function Type({ texts }: { texts: string[] }) {
  useEffect(() => {
    new Typewriter('#typewriter', {
      strings: texts,
      autoStart: true,
      loop: true,
    })
  }, [])

  return <h1 id='typewriter' className='text-gray-500 dark:text-gray-400'></h1>
}
