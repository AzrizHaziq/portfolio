import { IconBox } from './IconsBox'
import React, { useState } from 'react'
import { useCopyToClipboard } from 'react-use'

export const CopyClipboard = ({ texts, onClick = () => {} }: { onClick?: (text: string) => void; texts: string }) => {
  const [show, setShow] = useState<boolean>(false)
  const [copyState, copyToClipboard] = useCopyToClipboard()

  function onClickCopy() {
    if (!texts) {
      return
    }

    setShow(true)
    onClick(texts)
    copyToClipboard(texts)

    const t = setTimeout(() => {
      setShow(false)
      clearTimeout(t)
    }, 2000)
  }

  return (
    <>
      {show ? (
        <div className='relative'>
          <IconBox icon='CheckMark' className='z-0' title='Copy' />
          <div className='absolute right-0 w-auto px-4 py-2 text-sm text-center rounded text-primary-800 bg-primary-200 bottom-[30px]'>
            {copyState.error ? (
              <p className='!m-0'>Unable to copy value: {copyState.error.message}</p>
            ) : (
              copyState.value && <p className='!m-0'>Copied!</p>
            )}
          </div>
        </div>
      ) : (
        <a
          tabIndex={0}
          onClick={onClickCopy}
          className='cursor-pointer'
          onKeyUp={e => ['Enter', 'Space'].includes(e.code) && onClickCopy()}>
          <IconBox icon='Copy' />
        </a>
      )}
    </>
  )
}
