import { IconBox } from './IconsBox'
import React, { useState } from 'react'
import { useCopyToClipboard } from 'react-use'
import { trackEvent } from '@helpers/analytics'

export const CopyClipboard = ({ texts }: { texts: string }) => {
  const [show, setShow] = useState<boolean>(false)
  const [copyState, copyToClipboard] = useCopyToClipboard()

  function onClickCopy() {
    if (!texts) {
      return
    }

    setShow(true)
    copyToClipboard(texts)
    trackEvent('skills_copied', { category: 'skill', label: texts })

    const t = setTimeout(() => {
      setShow(false)
      clearTimeout(t)
    }, 2000)
  }

  return (
    <>
      {show ? (
        <div className={`relative`}>
          <IconBox icon='CheckMark' className={`w-6 h-6 z-0`} title={'Copy'} />
          <div className='absolute right-0 w-auto px-4 py-2 text-sm text-center text-indigo-800 bg-indigo-200 rounded bottom-[30px]'>
            {copyState.error ? (
              <p>Unable to copy value: {copyState.error.message}</p>
            ) : (
              copyState.value && <p>Copied!</p>
            )}
          </div>
        </div>
      ) : (
        <div onClick={onClickCopy}>
          <IconBox icon='Copy' />
        </div>
      )}
    </>
  )
}
