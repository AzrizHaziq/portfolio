import * as React from 'react'

export type Skills = {
  id: string
  skill: string
  color: string
}

export type PersonalData = {
  alias: string
  name: string
  email: string
  whoami: string[]
  skills: Skills[]
  projects: {
    name: string
    projectTime: string
    description: string
    details: string[]
  }[]
}

const PersonalDataContext = React.createContext<PersonalData | null>(null)

export function usePersonalData(): PersonalData {
  const context = React.useContext(PersonalDataContext)
  if (!context) {
    throw new Error(`useCount must be used within a PersonalDataContext`)
  }

  return context
}

export function PersonalDataProvider(props: any) {
  const [personalData, setPersonalData] = React.useState(null)
  const value = React.useMemo(() => [personalData, setPersonalData], [personalData])
  return <PersonalDataContext.Provider value={value} {...props} />
}
