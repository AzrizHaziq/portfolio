import * as React from 'react'

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

const PersonalDataContext = React.createContext<PersonalData | null>(null)

export function usePersonalData(): PersonalData {
  const context = React.useContext(PersonalDataContext)
  if (!context) {
    throw new Error(`usePersonalData must be used within a PersonalDataContext`)
  }

  return context
}

export function PersonalDataProvider(props: any) {
  const [personalData, setPersonalData] = React.useState(null)
  const value = React.useMemo(() => [personalData, setPersonalData], [personalData])
  return <PersonalDataContext.Provider value={value} {...props} />
}
