import { MdEmail } from 'react-icons/md'
import React, { ReactChildren } from 'react'
import type { IconBaseProps } from 'react-icons'
import { SiDeno, SiRust, SiTypescript, SiJavascript } from 'react-icons/si'
import { FaMediumM, FaStackOverflow, FaGithub, FaDev, FaLinkedin, FaTwitter, FaArrowDown } from 'react-icons/fa'

/**
 * <Icons.Medium class="fill-current text-black dark:text-white" />
 */
export const Icons: { [k: string]: any } = {
  // Social
  Github: ({ props }: { props: IconBaseProps }) => <FaGithub title='Github' {...props} />,
  Linkedin: ({ props }: { props: IconBaseProps }) => <FaLinkedin title='Linkedin' {...props} />,
  Twitter: ({ props }: { props: IconBaseProps }) => <FaTwitter title='Twitter' {...props} />,
  SO: ({ props }: { props: IconBaseProps }) => <FaStackOverflow title='StackOverflow' {...props} />,
  email: ({ props }: { props: IconBaseProps }) => <MdEmail title='email' {...props} />,

  // blogs
  Medium: ({ props }: { props: IconBaseProps }) => <FaMediumM title='Medium' {...props} />,
  Devto: ({ props }: { props: IconBaseProps }) => <FaDev title='Devto' {...props} />,

  // lang
  Deno: ({ props }: { props: IconBaseProps }) => <SiDeno title='Deno' {...props} />,
  Rust: ({ props }: { props: IconBaseProps }) => <SiRust title='Rust' {...props} />,
  TS: ({ props }: { props: IconBaseProps }) => <SiTypescript title='TS' {...props} />,
  JS: ({ props }: { props: IconBaseProps }) => <SiJavascript title='JS' {...props} />,
  ArrowDown: ({ props }: { props: IconBaseProps }) => <FaArrowDown title='Look more bellow' {...props} />,
}

/**
 * <IconBox icon='Medium' pre className='text-black dark:text-white' >asdasdas</IconBox>
 * @param param0
 * @returns
 */
export const IconBox = ({
  icon,
  children,
  pre = false,
  ...props
}: {
  icon: string
  children?: ReactChildren
  pre?: boolean
  className?: string
}) => {
  const IC = Icons[icon]

  return (
    <>
      {!pre && children}
      {IC({ props })}
      {pre && children}
    </>
  )
}
