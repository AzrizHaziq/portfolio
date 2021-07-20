import { usePersonalData } from '@feHelpers'
import { ExtendHead, Nav, Projects } from '@components'

const navHeader = '88px'
export default function SideProjects() {
  const { projects } = usePersonalData()

  return (
    <>
      <ExtendHead
        title='List of my side projects'
        description='Hopefully you find something interesting'
        permalink={`${process.env.NEXT_PUBLIC_HOSTNAME}/side-projects`}
        openGraph={{
          images: [
            { url: `${process.env.NEXT_PUBLIC_HOSTNAME}/assets/routes/side-projects.png`, alt: 'Side Projects' },
          ],
        }}
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
