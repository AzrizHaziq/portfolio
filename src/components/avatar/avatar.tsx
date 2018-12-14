import React from 'react';
import './avatar.scss';
import { splitter } from '../../helpers/char-jump'

const myName = splitter('Mohd Azriz Haziq Bin Jasni');
const myEmail = splitter('azrizhaziq@gmail.com');

export const Avatar = () => {
  return <div className='text-center text-white mb-4'>
    <p className='my-name mb-0'>{myName}</p>
    <p className="my-email text-underline">{myEmail}</p>
  </div>
}

