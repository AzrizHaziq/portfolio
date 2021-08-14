import { IconBox, IconBoxShape } from './IconsBox'
import { trackEvent } from '@helpers/analytics'

const socials: IconBoxShape[] = [
  {
    id: '1',
    className: 'fill-current text-black dark:text-white ',
    icon: 'Github',
    url: 'https://github.com/azrizhaziq',
  },
  {
    id: '2',
    icon: 'Linkedin',
    fill: '#0c66c2',
    url: 'https://www.linkedin.com/in/azriz-haziq-jasni-5876ab143/',
  },
  { id: '3', fill: 'rgb(28 161 242)', icon: 'Twitter', url: 'https://twitter.com/azrizhaziq' },
  { id: '4', fill: '#f48025', icon: 'SO', url: 'https://stackoverflow.com/users/3648961/azriz' },
]

const blogs: IconBoxShape[] = [
  {
    id: '5',
    className: 'fill-current text-black dark:text-white',
    icon: 'Devto',
    url: 'https://dev.to/azrizhaziq',
  },
  {
    id: '6',
    className: 'fill-current text-black dark:text-white',
    icon: 'Medium',
    url: 'https://azrizhaziq.medium.com/',
  },
]

const langs: IconBoxShape[] = [
  {
    id: '1',
    className: 'fill-current text-black bg-white rounded-full',
    icon: 'Deno',
    children: <title>Still learning</title>,
  },
  {
    id: '2',
    className: 'fill-current text-black dark:text-white ',
    icon: 'Rust',
    children: <title>Still learning</title>,
  },
  { id: '3', className: '', fill: '#3178c6', icon: 'TS' },
  { id: '4', className: '', fill: '#efdb7f', icon: 'JS' },
]

const merged = [socials, blogs].flat()

export function SocialLink() {
  const handleClick = (url: string) => () => trackEvent('socials', url)

  return (
    <div className='flex mb-2 gap-3'>
      {merged.map(({ id, icon, url, className = '', fill = '' }) => (
        <a
          href={url}
          key={`${id}--${icon}`}
          onClick={handleClick(url as string)}
          rel='noreferrer noopener'
          target='_blank'>
          <IconBox icon={icon} className={`${className} w-8 h-8 hover:opacity-80`} fill={fill} />
        </a>
      ))}
    </div>
  )
}

export function Langs() {
  return (
    <div className='flex gap-2'>
      {langs.map(({ id, icon, children = null, className = '', fill = '' }) => (
        <IconBox key={`${id}--${icon}`} icon={icon} className={`${className} w-6 h-6`} fill={fill}>
          {children}
        </IconBox>
      ))}
    </div>
  )
}
