import { IconBox } from './Icons'
import { useTheme } from 'next-themes'
import nightwind from 'nightwind/helper'
import { useEffect, useState } from 'react'

export function UseTheme() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isDark, setEnabled] = useState(theme === 'dark')
  const text = isDark ? 'Change to light mode' : 'Change to dark mode'

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  function toggle() {
    nightwind.beforeTransition()
    const enableDark = !isDark
    setEnabled(enableDark)
    setTheme(enableDark ? 'dark' : 'light')
  }

  return (
    <button aria-label={`Toggle to ${isDark ? 'Light' : 'Dark'} Mode`} onClick={toggle} className='cursor-pointer'>
      <span className='sr-only'>{isDark ? 'You are on dark theme' : 'Your are on light theme'}</span>
      <span className={`inline transform rounded-full`}>
        {isDark ? (
          <IconBox icon='Moon' className='w-6 h-6 text-gray-300 hover:text-gray-200' title={text} />
        ) : (
          <IconBox icon='Sun' className='w-6 h-6 text-[gold] opacity-80 hover:opacity-100' title={text} />
        )}
      </span>
    </button>
  )
}
