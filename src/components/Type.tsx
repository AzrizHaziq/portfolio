import React, { useEffect } from 'react'

export function Type({ texts }) {
  useEffect(() => {
    // @ts-ignore
    new Typewriter('#typewriter', {
      strings: texts,
      autoStart: true,
      loop: true,
    })
  }, [])

  return <h1 id='typewriter' className='text-gray-500 dark:text-gray-400'></h1>
}
