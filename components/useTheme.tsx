import { IconBox } from './IconsBox'
import { useTheme } from 'next-themes'
import nightwind from 'nightwind/helper'
import { useEffect, useState } from 'react'
import { trackEvent } from '@helpers/analytics'

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
    trackEvent('theme', { category: 'user_preference', label: enableDark ? 'dark' : 'light' })
  }

  return (
    <button aria-label={`Toggle to ${isDark ? 'Light' : 'Dark'} Mode`} onClick={toggle} className='cursor-pointer'>
      <span className='sr-only'>{isDark ? 'You are on dark theme' : 'Your are on light theme'}</span>
      <span className='inline rounded-full transform'>
        {isDark ? (
          <IconBox icon='Moon' className='text-gray-300 opacity-80 hover:opacity-100 nightwind-prevent' title={text} />
        ) : (
          <IconBox icon='Sun' className='opacity-80 hover:opacity-100 text-[gold]' title={text} />
        )}
      </span>
    </button>
  )
}
