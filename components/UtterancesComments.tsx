import { useTheme } from 'next-themes'
import React, { useEffect, useRef } from 'react'

export const UtterancesComments: React.FC = () => {
  const { theme } = useTheme()
  const elementRef = useRef<HTMLDivElement>(null)
  const t = theme === 'dark' ? 'github-dark' : 'github-light'

  // first load
  useEffect(() => {
    if (!elementRef.current) {
      return
    }

    const scriptElem = document.createElement('script')
    scriptElem.src = 'https://utteranc.es/client.js'
    scriptElem.async = true
    scriptElem.crossOrigin = 'anonymous'
    scriptElem.setAttribute('repo', 'azrizhaziq/portfolio')
    scriptElem.setAttribute('issue-term', 'url')
    scriptElem.setAttribute('label', 'blog-comment')
    scriptElem.setAttribute('theme', t)
    elementRef.current.appendChild(scriptElem)
    // eslint-disable-next-line
  }, [])

  // when theme change
  useEffect(() => {
    if (document.querySelector('.utterances-frame')) {
      const iframe = document.querySelector<HTMLIFrameElement>('.utterances-frame')

      if (!iframe) {
        return
      }

      iframe?.contentWindow?.postMessage({ type: 'set-theme', theme: t }, 'https://utteranc.es')
    }
  }, [t])

  return <section ref={elementRef} />
}
