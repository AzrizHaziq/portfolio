import React from 'react';
import './avatar.scss';
import { splitter } from '../../helpers/char-jump'
import personal from './../../data/personal.json'

const { name, email } = personal
const myName = splitter(name)
const myEmail = splitter(email)

export const Avatar = () => {
  return <div className='text-center text-white mb-4'>
    <h1 className='my-name mb-0'>{myName}</h1>
    <p className="my-email text-underline">{myEmail}</p>
  </div>
}

