import React, { useState } from 'react'
import { usePersonalData } from '@feHelpers'
import { CopyClipboard, IconBox } from '@components'

export const Skills = (): JSX.Element => {
  const { skills } = usePersonalData()
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  function toggle(skill: string) {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(i => i !== skill))
    } else {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  function clear() {
    setSelectedSkills([])
  }

  const setColorSkill = (skill: string): string =>
    selectedSkills.includes(skill) ? '' : selectedSkills.length > 0 ? 'opacity-30' : ''

  return (
    <>
      <div className={`flex justify-center md:justify-end space-x-2 text-black mb-3 cursor-default`}>
        {selectedSkills.length > 0 ? (
          <>
            <span title={`You have selected: ${selectedSkills.length}`}>{selectedSkills.length}</span>
            <div className={`hover:text-indigo-500 cursor-pointer`} onClick={clear}>
              <IconBox icon='Refresh' className={`refresh-spin w-6 h-6 `} title={'Clear'} />
            </div>
            <div className='hover:text-indigo-500 cursor-pointer'>
              <CopyClipboard texts={selectedSkills.join(', ')} />
            </div>
          </>
        ) : (
          <span>Click below 👇</span>
        )}
      </div>
      <div className='font-mono flex gap-2 flex-wrap justify-center'>
        {skills.map(item => (
          <span
            onClick={() => toggle(item.skill)}
            key={item.id}
            className={`cursor-pointer select-none rounded px-2 py-1 shadow hover:shadow-md hover:opacity-90
           ${setColorSkill(item.skill)} ${item.color}`}>
            {item.skill}
          </span>
        ))}
      </div>
    </>
  )
}
