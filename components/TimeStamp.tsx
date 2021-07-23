import format from 'date-fns/format'
import formatDistance from 'date-fns/formatDistance'

export function TimeStamp({ time }: { time: string }): JSX.Element {
  const date = formatDistance(new Date(), new Date(time))
  const dateFormatted = format(new Date(time), 'dd/MM/yyyy')

  return (
    <time className='text-xs text-gray-400'>
      <div className='sr-only'>{dateFormatted}</div>
      <span className='block group-hover:hidden'>{date}</span>
      <span className='hidden group-hover:block'>{dateFormatted}</span>
    </time>
  )
}
