import React from 'react'
// import './char-jump.scss';

export const splitter = (str: string) =>
  str.split('').map((char, key) => (
    <span className={`d-inline-block jump ${char === ' ' ? 'mr-3' : ''}`} key={key}>
      {char}
    </span>
  ))
