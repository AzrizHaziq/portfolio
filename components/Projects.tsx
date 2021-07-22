import { Tag } from './Tag'
import Image from 'next/image'
import { Project } from '@feHelpers'

export const Projects = ({
  project: { name, build_with, img, web_url, github_url, descriptions },
}: {
  project: Project
}) => {
  return (
    <>
      <a
        href={web_url ?? github_url}
        target='_blank'
        rel='noopener noreferrer'
        className='group h-56 relative w-full overflow-hidden border-2 border-transparent hover:border-white rounded-lg shadow-lg border-white text-white nightwind-prevent'>
        <div className='absolute inset-0 w-full h-full object-fill object-center filter blur-sm md:blur-none group-hover:blur-sm'>
          <Image layout='fill' className='w-full h-full' src={img} alt={name} objectFit='cover' />
        </div>
        <div className='flex md:hidden group-hover:flex absolute font-mono inset-0 h-full justify-end p-6 flex-col gap-2 bg-gradient-to-b from-transparent to-gray-900'>
          <span className='w-full text-xs flex gap-1 flex-wrap'>
            {build_with.map((i, index) => (
              <Tag key={index}>{i}</Tag>
            ))}
          </span>
          <h5 className='w-full font-bold text-2xl opacity-90 leading-tight line-clamp-1 sm:line-clamp-2'>{name}</h5>
          <h6 className='line-clamp-2'>{descriptions}</h6>
        </div>
      </a>
    </>
  )
}
