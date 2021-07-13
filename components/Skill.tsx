// import data from '@data'
import React, { useContext } from 'react'
import { v4 as uuid } from 'uuid'
import { PersonalDataContext } from '@helpers'

interface Skills {
  id: string
  skill: string
  color: string
}

const colors = [
  'bg-yellow-100 text-yellow-600',
  'bg-red-200 text-red-600',
  'bg-blue-200 text-blue-600',
  'bg-green-200 text-green-600',
  'bg-white text-black border-1 border-black',
]

function random(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min)
}

const shuffle = (arr: any[]): any[] =>
  [...arr].reduceRight((res, _, __, s) => (res.push(s.splice(0 | (Math.random() * s.length), 1)[0]), res), [])

export const Skills = (): JSX.Element => {
  const { skills } = useContext(PersonalDataContext)

  const merged: Skills[] = shuffle(skills).map(item => ({
    skill: item,
    id: uuid(),
    color: colors[random(0, colors.length)],
  }))

  return (
    <div className='font-mono flex gap-2 flex-wrap justify-center'>
      {merged.map(item => (
        <span key={item.id} className={`cursor-pointer rounded px-2 py-1 shadow hover:shadow-md ${item.color}`}>
          {item.skill}
        </span>
      ))}
    </div>
  )
}
