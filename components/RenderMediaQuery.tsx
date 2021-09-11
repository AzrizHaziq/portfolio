export const RenderMediaQuery = () => (
  <div className='fixed bottom-0 w-screen text-center' data-render-media-queries=''>
    <div className='block w-full bg-red-500 sm:hidden'>xs</div>
    <div className='hidden w-full w-screen bg-pink-500 sm:block md:hidden'>sm</div>
    <div className='hidden w-full w-screen bg-yellow-500 md:block lg:hidden'>md</div>
    <div className='hidden w-full w-screen bg-green-500 lg:block xl:hidden'>lg</div>
    <div className='hidden w-full w-screen bg-blue-500 xl:block 2xl:hidden'>xl</div>
    <div className='hidden w-full w-screen bg-primary-500 2xl:block'>2xl</div>
  </div>
)

// below only used for msxBundle
// on first, JSX dont really work with 'fixed'
// so have to clone the dom and append to body and make it hidden while on this page
// after leaving this page will remove it back
export const asMdxBundler_RenderMediaQueries = `
import * as React from 'react'

export function RenderMediaQueries() {
  const ref = React.useRef(null)

  React.useEffect(() => {
    if(!ref.current) return 
    console.log(ref.current)

    let temp = ref.current.cloneNode(true)
    ref.current.classList.add('hidden')
    document.body.append(temp)
    
    return () => { 
      temp.remove()
      temp = null
    }

  }, [ref.current])

  return (
   <div ref={ref} className='fixed bottom-0 w-screen text-center' data-render-media-queries=''>
     <div className='block w-full bg-red-500 sm:hidden'>xs</div>
     <div className='hidden w-full w-screen bg-pink-500 sm:block md:hidden'>sm</div>
     <div className='hidden w-full w-screen bg-yellow-500 md:block lg:hidden'>md</div>
     <div className='hidden w-full w-screen bg-green-500 lg:block xl:hidden'>lg</div>
     <div className='hidden w-full w-screen bg-blue-500 xl:block 2xl:hidden'>xl</div>
     <div className='hidden w-full w-screen bg-primary-500 2xl:block'>2xl</div>
   </div>
   )
}
`
