import * as React from 'react'
import { v4 as uuid } from 'uuid'
import data from '../../personal-data.json'

export type Skill = {
  id: string
  skill: string
  color: string
}

export type Project = {
  name: string
  github_url: string
  web_url: string
  descriptions: string
  build_with: string[]
  img: string
  status: 'stop' | 'active' | 'archive'
}

export type PersonalData = {
  alias: string
  name: string
  email: string
  whoami: string[]
  skills: Skill[]
  projects: Project[]
}

const colors = [
  'bg-yellow-200 text-yellow-600 nightwind-prevent',
  'bg-red-200 text-red-600',
  'bg-blue-200 text-blue-600',
  'bg-green-200 text-green-600',
  'bg-pink-200 text-pink-600',
  'bg-cyan-200 text-cyan-600',
  'bg-lime-200 text-lime-600',
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

const PersonalDataContext = React.createContext<PersonalData | null>(null)

export function usePersonalData(): PersonalData {
  const context = React.useContext(PersonalDataContext)
  if (!context) {
    throw new Error(`usePersonalData must be used within a PersonalDataContext`)
  }

  return context
}

export function PersonalDataProvider(props: any) {
  const [personalData, setPersonalData] = React.useState({ ...data, skills: mergedSkills })
  const [value] = React.useMemo(() => [personalData, setPersonalData], [personalData])
  return <PersonalDataContext.Provider value={value} {...props} />
}
