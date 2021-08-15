import { Tag } from './Tag'
import Image from 'next/image'
import { Project } from '@helper_client'
import { trackEvent } from '@helpers/analytics'

export const Projects = ({
  project: { name, build_with, img, web_url, github_url, descriptions },
}: {
  project: Project
}) => {
  const handleClick = () => trackEvent('side_projects_open', { category: 'side_projects', label: name })

  return (
    <a
      href={web_url || github_url}
      onClick={handleClick}
      target='_blank'
      rel='noopener noreferrer'
      className='relative w-full h-56 overflow-hidden text-white border-2 border-transparent border-black rounded-lg shadow-lg dark:text-white group hover:border-black'>
      <div className='absolute bottom-0 left-0 right-0 block h-10 text-white bg-black line-clamp-1 group-hover:hidden z-[1]'>
        <div className='flex items-center w-full h-full'>
          <span className='mx-6 font-mono text-base line-clamp-1'>{name}</span>
        </div>
      </div>
      <div className='absolute inset-0 object-fill object-center w-full h-full filter blur-sm md:blur-none group-hover:blur-sm'>
        <Image layout='fill' className='w-full h-full' src={img} alt={name} objectFit='cover' />
      </div>
      <div className='absolute inset-0 flex flex-col justify-end h-full p-6 font-mono md:hidden group-hover:flex gap-2 bg-gradient-to-b from-transparent to-gray-900'>
        <span className='flex flex-wrap w-full text-xs gap-1'>
          {build_with.map((i, index) => (
            <Tag key={index}>{i}</Tag>
          ))}
        </span>
        <h5 className='w-full text-2xl font-bold leading-tight opacity-90 line-clamp-1 sm:line-clamp-2'>{name}</h5>
        <h6 className='line-clamp-2'>{descriptions}</h6>
      </div>
    </a>
  )
}
