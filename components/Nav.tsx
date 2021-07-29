import Link from 'next/link'
import { IconBox } from './IconsBox'
import { UseTheme } from './useTheme'
import { useRouter } from 'next/router'
import React, { Fragment } from 'react'
import { trackEvent } from '@helpers/analytics'
import { usePersonalData } from '@helper_client'
import { Popover, Transition } from '@headlessui/react'

interface Nav {
  id: number
  href: string
  title: string
}

const navs: Nav[] = [
  { id: 1, href: '/side-projects', title: 'Side Projects' },
  { id: 2, href: '/blogs', title: 'Blogs' },
]

function Logo() {
  const router = useRouter()
  const { email } = usePersonalData()

  const handleEmailClick = () => trackEvent('nav_email', null)

  return (
    <div className='font-mono cursor-pointer'>
      {router.pathname === '/' ? (
        <a
          href={`mailto:${email}`}
          onClick={handleEmailClick}
          className='flex items-center px-2 py-1 font-mono font-bold uppercase space-x-1'>
          <IconBox icon='email' />
          <span>{email}</span>
        </a>
      ) : (
        <Link href='/'>
          <a aria-label='Home'>
            <IconBox
              icon='Home'
              title='Home'
              className={'mr-2 w-8 h-8 text-indigo-400 dark:text-indigo-400 hover:opacity-80'}
            />
          </a>
        </Link>
      )}
    </div>
  )
}

function PageLinks({ navs, isMobile = false }: { navs: Nav[]; isMobile?: boolean }): JSX.Element {
  const router = useRouter()

  const classNames = isMobile
    ? 'text-indigo-600 hover:text-indigo-800 dark:text-indigo-300 dark:hover:text-indigo-200'
    : 'text-gray-300 hover:text-gray-200 dark:text-indigo-300 dark:hover:text-indigo-200'

  const isActive = ({ href }: Nav): string => (router.pathname === href ? 'font-extrabold' : '')

  return (
    <>
      {navs.map(nav => (
        <Link key={nav.id} href={nav.href}>
          <a className={`text-base font-mono ${classNames} ${isActive(nav)}`}>{nav.title}</a>
        </Link>
      ))}
    </>
  )
}

export function Nav() {
  return (
    <div className='sticky top-0 z-10'>
      <Popover className='relative border-b-4 border-indigo-300 bg-gradient-to-r from-indigo-900 to-indigo-700'>
        {({ open }) => (
          <>
            <div className='px-4 mx-auto max-w-7xl sm:px-6'>
              <div className='flex items-center justify-between py-6 border-gray-100 md:justify-start md:space-x-10'>
                <div className='flex justify-start text-indigo-200 lg:w-0 lg:flex-1 hover:text-indigo-300 dark:text-indigo-300 dark:hover:text-indigo-200'>
                  <Logo />
                </div>
                <div className='-my-2 -mr-2 md:hidden'>
                  <Popover.Button className='inline-flex items-center justify-center p-2 text-gray-400 fill-current rounded-md hover:text-gray-100 hover:bg-indigo-600 dark:hover:bg-indigo-600 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                    <span className='sr-only'>Open menu</span>
                    <IconBox icon='Menu' />
                  </Popover.Button>
                </div>
                <Popover.Group as='nav' className='hidden md:flex space-x-10'>
                  <PageLinks navs={navs} />
                  <UseTheme />
                </Popover.Group>
              </div>
            </div>

            <Transition
              show={open}
              as={Fragment}
              enter='duration-200 ease-out'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='duration-100 ease-in'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'>
              <Popover.Panel
                focus
                static
                className='absolute inset-x-0 top-0 p-2 transition transform origin-top-right md:hidden'>
                <div className='border-2 border-indigo-400 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-gradient-to-r from-indigo-300 to-indigo-100 dark:from-indigo-900 dark:to-indigo-600'>
                  <div className='relative px-5 pt-5 pb-6'>
                    <div className='flex items-center justify-center text-indigo-500 hover:text-indigo-600 dark:text-indigo-300 dark:hover:text-indigo-200'>
                      <Logo />
                    </div>
                    <div className='absolute right-0 mr-2 top-1/4'>
                      <Popover.Button className='inline-flex items-center justify-center p-2 text-gray-400 fill-current rounded-md hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-indigo-600 dark:hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                        <span className='sr-only'>Close menu</span>
                        <IconBox icon='XMark' className='w-6 h-6 text-indigo-400' />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className='px-5 py-6 space-y-6'>
                    <div className='grid grid-cols-1 gap-y-4 gap-x-8'>
                      <PageLinks navs={navs} isMobile />
                      <UseTheme />
                    </div>
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
