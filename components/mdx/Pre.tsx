import { CopyClipboard } from '@components'
import { trackEvent } from '@helpers/analytics'
import { useEffect, useRef, useState } from 'react'

export const Pre = (props: any) => {
  const [texts, setTexts] = useState('')
  const preElement = useRef<HTMLPreElement>(null)

  useEffect(() => {
    setTexts(preElement!.current!.innerText)
  }, [])

  return (
    <div className='relative'>
      <div className='absolute right-[10px] top-[10px] ah-article--copy-code'>
        <CopyClipboard
          texts={texts}
          onClick={texts => {
            trackEvent('code_copied', { category: 'blog', label: texts })
          }}
        />
      </div>
      <pre ref={preElement}>{props.children}</pre>
    </div>
  )
}
