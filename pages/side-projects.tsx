import { usePersonalData } from '@helper_client'
import { useTrackPage } from '@helpers/analytics'
import { ExtendHead, Nav, Projects } from '@components'

const navHeader = '88px'
export default function SideProjects() {
  const { projects } = usePersonalData()
  useTrackPage({ title: 'side_projects', path: '/side-projects' })

  return (
    <>
      <ExtendHead
        url='/side-projects'
        title='List of my side projects'
        description='I use my free time to build something great.'
        imgUrl='/assets/routes/side-projects.png'
        imgAlt='I use my free time to build something great.'
      />
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
