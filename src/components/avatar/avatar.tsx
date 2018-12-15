import React from 'react';
import './avatar.scss';
import { splitter } from '../../helpers/char-jump'

const myName = splitter('Mohd Azriz Haziq Bin Jasni');
const myEmail = splitter('azrizhaziq@gmail.com');

export const Avatar = () => {
  return <div className='text-center text-white mb-4'>
    <h1 className='my-name mb-0'>{myName}</h1>
    <p className="my-email text-underline">{myEmail}</p>
  </div>
}

