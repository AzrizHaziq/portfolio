import { IconBox } from './Icons'

const socials: any[] = [
  {
    id: 1,
    className: 'fill-current text-black dark:text-white ',
    icon: 'Github',
    url: 'https://github.com/azrizhaziq',
  },
  {
    id: 2,
    className: 'fill-current text-blue-600 ',
    icon: 'Linkedin',
    url: 'https://www.linkedin.com/in/azriz-haziq-jasni-5876ab143/',
  },
  { id: 3, className: '', fill: 'rgb(28 161 242)', icon: 'Twitter', url: 'https://twitter.com/azrizhaziq' },
  { id: 4, className: '', fill: '#f48025', icon: 'SO', url: 'https://stackoverflow.com/users/3648961/azriz' },
]

const blogs: any[] = [
  { id: 1, className: 'fill-current text-black dark:text-white', icon: 'Devto', url: 'https://github.com/azrizhaziq' },
  { id: 2, className: 'fill-current text-black dark:text-white', icon: 'Medium', url: 'https://github.com/azrizhaziq' },
]

const langs: any[] = [
  {
    id: 1,
    className: 'fill-current text-black bg-white rounded-full',
    icon: 'Deno',
    children: <title>Still learning</title>,
  },
  {
    id: 2,
    className: 'fill-current text-black dark:text-white ',
    icon: 'Rust',
    children: <title>Still learning</title>,
  },
  { id: 3, className: '', fill: '#3178c6', icon: 'TS' },
  { id: 4, className: '', fill: '#efdb4f', icon: 'JS' },
]

const merged: any[] = [socials, blogs].flat()

export function SocialLink() {
  return (
    <div className='flex flex-col md:flex-row justify-start md:justify-between'>
      <div className='flex gap-2 mb-2'>
        {merged.map(({ id, icon, url, className = '', fill = '' }: any) => (
          <a href={url} key={`${id}--${icon}`} rel='noreferrer noopener' target='_blank'>
            <IconBox icon={icon} className={`${className} w-6 h-6 hover:opacity-80`} fill={fill} />
          </a>
        ))}
      </div>
    </div>
  )
}

export function Langs() {
  return (
    <div className='flex gap-2'>
      {langs.map(({ id, icon, children = null, className = '', fill = '' }: any) => (
        <IconBox key={`${id}--${icon}`} icon={icon} className={`${className} w-6 h-6`} fill={fill}>
          {children}
        </IconBox>
      ))}
    </div>
  )
}
