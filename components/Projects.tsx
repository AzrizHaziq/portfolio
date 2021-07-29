import { Tag } from './Tag'
import Image from 'next/image'
import { Project } from '@helper_client'
import { trackEvent } from '@helpers/analytics'

export const Projects = ({
  project: { name, build_with, img, web_url, github_url, descriptions },
}: {
  project: Project
}) => {
  const handleClick = () => trackEvent('side_projects_open', name)

  return (
    <>
      <a
        href={web_url || github_url}
        onClick={handleClick}
        target='_blank'
        rel='noopener noreferrer'
        className='relative w-full h-56 overflow-hidden text-white border-2 border-transparent border-white rounded-lg shadow-lg group hover:border-white nightwind-prevent'>
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
    </>
  )
}
