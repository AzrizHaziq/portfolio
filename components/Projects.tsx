import Image from 'next/image'
import { Project } from '@helpers'

const Tag = ({ children }: { children: string }) => (
  <span className='px-2 py-1 bg-indigo-100 text-indigo-600 border rounded-full border-indigo-600'>{children}</span>
)

export const Projects = ({
  project: { name, build_with, img, web_url, github_url, descriptions },
}: {
  project: Project
}) => {
  return (
    <>
      <style jsx>{`
        .project:hover .project--image {
          --tw-blur: blur(4px);
        }

        .project:hover .project--detail {
          display: flex;
        }
      `}</style>
      <a
        href={web_url ?? github_url}
        target='_blank'
        rel='noopener noreferrer'
        className='project h-56 relative w-full overflow-hidden rounded-lg shadow-lg hover:border-2 text-white'>
        <div className='project--image absolute inset-0 w-full h-full object-fill object-center filter blur md:blur-none'>
          <Image layout='fill' className='w-full h-full' src={img} alt={name} objectFit='cover' />
        </div>
        <div className='project--detail flex md:hidden absolute font-mono inset-0 h-full justify-end p-6 flex-col gap-2 bg-gradient-to-b from-transparent  to-gray-900'>
          <h4 className='w-full text-xs flex gap-1 flex-wrap'>
            {build_with.map((i, index) => (
              <Tag key={index}>{i}</Tag>
            ))}
          </h4>
          <h3 className='w-full font-bold text-2xl opacity-90 leading-tight'>{name}</h3>
          <h6>{descriptions}</h6>
        </div>
      </a>
    </>
  )
}
