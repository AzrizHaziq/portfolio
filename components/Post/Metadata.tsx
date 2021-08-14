import React from 'react'
import { Tag, TimeStamp } from '@components'

export function Metadata({
  tag_list,
  reading_time,
  published_timestamp,
}: {
  tag_list: string[]
  reading_time: string
  published_timestamp: string
}) {
  return (
    <div className='flex flex-col md:flex-row'>
      <div className='flex flex-wrap items-center space-x-1'>
        {tag_list.map((tag: string, index: number) => (
          <Tag key={index}>{tag}</Tag>
        ))}
      </div>
      <div className='flex'>
        <span className='hidden md:block'>{'・'}</span>
        <span>{reading_time}</span>
        {'・'}
        <TimeStamp time={published_timestamp as string} />
      </div>
    </div>
  )
}
