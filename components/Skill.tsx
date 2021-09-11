import React, { useState } from 'react'
import { trackEvent } from '@helpers/analytics'
import { CopyClipboard, IconBox } from '@components'
import { Skill, usePersonalData } from '@helper_client'

export const Skills = (): JSX.Element => {
  const { skills } = usePersonalData()
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])

  function toggle(skill: string) {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(i => i !== skill))
      trackEvent('skills_remove', { category: 'skill', label: skill })
    } else {
      setSelectedSkills([...selectedSkills, skill])
      trackEvent('skills_add', { category: 'skill', label: skill })
    }
  }

  function clear() {
    setSelectedSkills([])
    trackEvent('skills_clear', { category: 'skill' })
  }

  const setColorSkill = (skill: string): string =>
    selectedSkills.includes(skill) ? '' : selectedSkills.length > 0 ? 'opacity-30' : ''

  const cls = (item: Skill) => `
    cursor-pointer select-none rounded px-2 py-1 shadow hover:shadow-md hover:opacity-90 
    ${setColorSkill(item.skill)} ${item.color}`

  return (
    <>
      <div className='flex justify-center mb-3 text-black cursor-default md:justify-end space-x-2'>
        <style global jsx>{`
          .refresh-wrapper:focus-within .refresh-spin,
          .refresh-wrapper:hover .refresh-spin {
            animation: refresh-spin 1s cubic-bezier(0.65, -0.21, 0.43, 1.23) infinite;
          }

          @keyframes refresh-spin {
            from {
              transform: rotate(0);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
        {selectedSkills.length > 0 ? (
          <>
            <span title={`You have selected: ${selectedSkills.length}`}>{selectedSkills.length}</span>
            <a
              tabIndex={0}
              className='cursor-pointer hover:text-primary-500 refresh-wrapper'
              onClick={clear}
              onKeyUp={e => ['Enter', 'Space'].includes(e.code) && clear()}>
              <IconBox icon='Refresh' className='refresh-spin w-7' title='Clear' />
            </a>
            <div className='hover:text-primary-500'>
              <CopyClipboard
                texts={selectedSkills.join(', ')}
                onClick={texts => {
                  trackEvent('skills_copied', { category: 'skill', label: texts })
                }}
              />
            </div>
          </>
        ) : (
          <span>Click below 👇</span>
        )}
      </div>
      <ul className='flex flex-wrap justify-center font-mono gap-2'>
        {skills.map(item => (
          <li
            tabIndex={0}
            key={item.id}
            onKeyUp={e => ['Enter', 'Space'].includes(e.code) && toggle(item.skill)}
            onClick={() => toggle(item.skill)}
            className={cls(item)}>
            {item.skill}
          </li>
        ))}
      </ul>
    </>
  )
}
