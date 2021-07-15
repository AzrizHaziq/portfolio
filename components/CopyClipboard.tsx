import { IconBox } from './Icons'
import React, { useState } from 'react'
import { useCopyToClipboard } from 'react-use'

export const CopyClipboard = ({ texts }: { texts: string }) => {
  const [show, setShow] = useState<boolean>(false)
  const [copyState, copyToClipboard] = useCopyToClipboard()

  function onClickCopy() {
    if (!texts) {
      return
    }

    setShow(true)
    copyToClipboard(texts)

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
          <div className='absolute bg-indigo-200 text-indigo-800 text-sm rounded py-2 px-4 right-0 bottom-[30px] w-auto text-center'>
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
