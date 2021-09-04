import React from 'react'

export const UtterancesComments: React.FC = () => (
  <section
    ref={elem => {
      if (!elem) {
        return
      }
      const scriptElem = document.createElement('script')
      scriptElem.src = 'https://utteranc.es/client.js'
      scriptElem.async = true
      scriptElem.crossOrigin = 'anonymous'
      scriptElem.setAttribute('repo', 'azrizhaziq/portfolio')
      scriptElem.setAttribute('issue-term', 'url')
      scriptElem.setAttribute('label', 'blog-comment')
      scriptElem.setAttribute('theme', 'github-dark')
      elem.appendChild(scriptElem)
    }}
  />
)
