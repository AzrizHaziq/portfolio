import React from 'react';
import './avatar.scss';
import { IMG } from '../../assets/img';

export const Avatar = () => {
  return <div className="position-relative">
    <img alt="avatar" className="avatar-img shadow" src={IMG.avatarPng}/>
    <div className="position-absolute tag-name bg-warning p-2 text-center">
      Mohd Azriz Haziq Bin Jasni <br/>
      azrizhaziq@gmail.com
    </div>
  </div>
}