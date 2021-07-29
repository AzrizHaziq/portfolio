import { useState } from 'react'
import useInterval from './useInterval'

const HIs = ['👋', '👋🏻', '👋🏼', '👋🏽', '👋🏾', '👋🏿']

export function useHi() {
  const [hi, setHi] = useState<string>(HIs[0])
  const [index, setIndex] = useState<number>(0)

  useInterval(() => {
    const newIndex = index + 1
    const i: number = newIndex === HIs.length ? 0 : newIndex
    setIndex(() => i)
    setHi(HIs[i % HIs.length])
  }, 2000)

  return hi
}
