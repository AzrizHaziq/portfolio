import { usePersonalData } from '@helpers'
import { Nav, Projects } from '@components'

const navHeader = '88px'

export default function SideProjects() {
  const { projects } = usePersonalData()

  return (
    <>
      <Nav />
      <main
        className='flex items-center justify-center mx-auto md:max-w-5xl'
        style={{ minHeight: `calc(100vh - ${navHeader})` }}>
        <div className='w-full p-10 grid grid-cols-1 sm:grid-cols-2 gap-2'>
          {projects.map(p => (
            <Projects key={p.name} project={p} />
          ))}
        </div>
      </main>
    </>
  )
}
