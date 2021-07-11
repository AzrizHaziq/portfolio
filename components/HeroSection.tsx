import { Type } from './Type'
import { SocialLink } from './SocialLink'

const whoami: string[] = [
  'programmer',
  '❤️ cats',
  'I hate JS',
  'Just kidding 🙂',
  'Always bet on Deno, Rust, Typescript',
  '❤️  unit and e2e test',
  'Non stop learn something new',
]

export function HeroSection() {
  return (
    <main className='hero-section'>
      <div className='flex flex-col justify-center mx-auto space-y-2 p-5'>
        <h1 className='text-5xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
          <span className='block text-black: dark:text-white xl:mr-2'>Hi 👋,</span>
          <div className='block text-indigo-600'>Azriz Haziq Jasni</div>
        </h1>
        <span>
          <a
            className='inline-block bg-indigo-50 px-4 py-1 rounded-full text-indigo-500 font-semibold text-sm hover:text-indigo-600'
            href='mailto:azrizhaziq@gmail.com'>
            azrizhaziq@gmail.com
          </a>
        </span>
        <p className='mt-3 text-base text-gray-500'>
          <Type texts={whoami} />
        </p>
        <SocialLink />
      </div>
      <div>
        <div className='m-auto p-10 bg-indigo-500'></div>
      </div>
    </main>
  )
}

/*

      <style>
        .hero-section {
        height: calc(100vh - 88px);
        grid-auto-rows: 1fr;
        @apply grid gap-2 grid-cols-1 md:grid-cols-2;
      }


        .main-section {

      }

      </style>
 */
