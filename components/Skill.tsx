// import data from '@data'
import React from 'react'
import { usePersonalData } from '@helpers'

export const Skills = (): JSX.Element => {
  const { skills } = usePersonalData()

  return (
    <div className='font-mono flex gap-2 flex-wrap justify-center'>
      {skills.map(item => (
        <span key={item.id} className={`cursor-pointer rounded px-2 py-1 shadow hover:shadow-md ${item.color}`}>
          {item.skill}
        </span>
      ))}
    </div>
  )
}
