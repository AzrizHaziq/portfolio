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
    <div className='relative group'>
      <div className='absolute right-[10px] top-[10px]'>
        <div className='p-1 rounded opacity-0 opacity-100 sm:opacity-0 bg-primary-300 dark:bg-primary-200 group-hover:opacity-100 ah-article--copy-code'>
          <CopyClipboard
            texts={texts}
            onClick={texts => {
              trackEvent('code_copied', { category: 'blog', label: texts })
            }}
          />
        </div>
      </div>
      <pre ref={preElement}>{props.children}</pre>
    </div>
  )
}
