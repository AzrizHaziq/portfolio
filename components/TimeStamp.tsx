import format from 'date-fns/format'
import formatDistance from 'date-fns/formatDistance'

export function TimeStamp({ time, separator = true }: { time: string; separator?: boolean }): JSX.Element {
  const date = formatDistance(new Date(), new Date(time))
  const dateFormatted = format(new Date(time), 'dd MMMM yyyy')

  return (
    <time className='flex justify-between'>
      <span>{dateFormatted}</span>
      {separator && '・'}
      <span>{date} ago</span>
    </time>
  )
}
