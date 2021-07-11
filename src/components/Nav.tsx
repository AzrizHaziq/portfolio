/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'

interface Navs {
  id: number
  href: string
  title: string
}

const navs: Navs[] = [
  { id: 1, href: '/side-projects', title: 'Side Projects' },
  { id: 2, href: '/blogs', title: 'Blogs' },
]

function Logo() {
  return (
    <a
      href='/'
      className='px-2 py-1 text-indigo-600 hover:text-indigo-700 dark:text-indigo-300 dark:hover:text-indigo-200'>
      <span className='sr-only'>Azriz Haziq Jasni</span>
      <h1 className='font-zen text-2xl'>AJ</h1>
    </a>
  )
}

export default function Nav() {
  return (
    <div className='sticky top-0'>
      <Popover className='relative bg-gradient-to-r from-gray-300 to-gray-50 dark:from-indigo-900 dark:to-indigo-700 border-b-2 border-gray-400 dark:border-indigo-400'>
        {({ open }) => (
          <>
            <div className='max-w-7xl mx-auto px-4 sm:px-6'>
              <div className='flex justify-between items-center border-gray-100 py-6 md:justify-start md:space-x-10'>
                <div className='flex justify-start lg:w-0 lg:flex-1'>
                  <Logo />
                </div>
                <div className='-mr-2 -my-2 md:hidden'>
                  <Popover.Button className='rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600 fill-current dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                    <span className='sr-only'>Open menu</span>
                    <MenuIcon className='h-6 w-6' aria-hidden='true' />
                  </Popover.Button>
                </div>
                <Popover.Group as='nav' className='hidden md:flex space-x-10'>
                  {navs.map(nav => (
                    <a
                      href={nav.href}
                      key={nav.id}
                      className='text-base font-medium text-indigo-400  hover:text-indigo-600 dark:text-indigo-300 dark:hover:text-indigo-200'>
                      {nav.title}
                    </a>
                  ))}
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
                className='absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden'>
                <div className='rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-gradient-to-r from-gray-300 to-gray-50 dark:from-indigo-900 dark:to-indigo-700 border-2 border-indigo-400'>
                  <div className='pt-5 pb-6 px-5 relative'>
                    <div className='flex items-center justify-center'>
                      <Logo />
                    </div>
                    <div className='absolute mr-2 top-1/4 right-0'>
                      <Popover.Button className='rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-indigo-600 fill-current dark:hover:text-indigo-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500'>
                        <span className='sr-only'>Close menu</span>
                        <XIcon className='h-6 w-6' aria-hidden='true' />
                      </Popover.Button>
                    </div>
                  </div>
                  <div className='py-6 px-5 space-y-6'>
                    <div className='grid grid-cols-2 gap-y-4 gap-x-8'>
                      {navs.map(nav => (
                        <a
                          href={nav.href}
                          key={nav.id}
                          className='text-base font-medium text-indigo-400  hover:text-indigo-600 dark:text-indigo-300 dark:hover:text-indigo-200'>
                          {nav.title}
                        </a>
                      ))}
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
