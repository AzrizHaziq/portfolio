import React from 'react'
import Typewriter, { TypewriterClass } from 'typewriter-effect'

export function Type({
  texts,
  showCallBack = () => {},
  hideCallBack = () => {},
}: {
  texts: string[]
  showCallBack?: () => void
  hideCallBack?: () => void
}) {
  return (
    <Typewriter
      options={{
        autoStart: true,
        loop: true,
      }}
      onInit={(typewriter: TypewriterClass) => {
        texts.forEach(text => {
          typewriter.typeString(text).pauseFor(3000).deleteAll()
        })

        typewriter
          .typeString('Always bet on')
          .callFunction(showCallBack)
          .pauseFor(3000)
          .callFunction(hideCallBack)
          .deleteAll()
          .start()
      }}
    />
  )
}
