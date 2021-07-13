import { IconBox } from '@components'
import React, { useState } from 'react'
import { usePersonalData } from '@helpers'

export const Skills = (): JSX.Element => {
  const { skills } = usePersonalData()
  const [ids, setIds] = useState<string[]>([])

  function toggle(selectedId: string) {
    if (ids.includes(selectedId)) {
      setIds(ids.filter(id => id !== selectedId))
    } else {
      setIds([...ids, selectedId])
    }
  }

  function clear() {
    setIds([])
  }

  const setColorSkill = (id: string): string => (ids.includes(id) ? 'font-bold' : ids.length > 0 ? 'opacity-20' : '')

  return (
    <>
      <div className={`text-right ${ids.length > 0 || 1 ? 'block' : 'hidden'}`}>
        <div onClick={clear}>
          <IconBox icon='Refresh' className={`w-6 h-6 cursor-pointer hover:text-red-700`}>
            You have selected {ids.length}
          </IconBox>
        </div>
      </div>
      <div className='font-mono flex gap-2 flex-wrap justify-center'>
        {skills.map(item => (
          <span
            onClick={() => toggle(item.id)}
            key={item.id}
            className={`cursor-pointer select-none rounded px-2 py-1 shadow hover:shadow-md hover:opacity-90
           ${setColorSkill(item.id)} ${item.color}`}>
            {item.skill}
          </span>
        ))}
      </div>
    </>
  )
}
