import format from 'date-fns/format'
import formatDistance from 'date-fns/formatDistance'

export function TimeStamp({ time }: { time: string }): JSX.Element {
  const date = formatDistance(new Date(), new Date(time))
  const dateFormatted = format(new Date(time), 'dd/MM/yyyy')

  return (
    <time className='flex justify-between text-xs text-gray-400 group'>
      <span>{dateFormatted}</span>
      <span className='hidden group-hover:block'>{date} ago</span>
    </time>
  )
}
