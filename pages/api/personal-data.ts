import { v4 as uuid } from 'uuid'
import data from 'personal-data.json'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
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

  const mergedSkills = shuffle(data.skills).map(item => ({
    skill: item,
    id: uuid(),
    color: colors[random(0, colors.length)],
  }))

  res.status(200).json({ ...data, skills: mergedSkills })
}
