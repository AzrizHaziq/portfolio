import React from 'react'
import { SiDeno, SiRust, SiTypescript, SiJavascript } from 'react-icons/si'
import { FaMediumM, FaStackOverflow, FaGithub, FaDev, FaLinkedin, FaTwitter } from 'react-icons/fa'

/**
 * <Icons.Medium class="fill-current text-black dark:text-white" />
 */
export const Icons = {
  // Social
  Github: FaGithub,
  Linkedin: FaLinkedin,
  Twitter: FaTwitter,
  SO: FaStackOverflow,

  // blogs
  Medium: FaMediumM,
  Devto: FaDev,

  // lang
  Deno: SiDeno,
  Rust: SiRust,
  TS: SiTypescript,
  JS: SiJavascript,
}

/**
 * <IconBox icon='Medium' pre className='text-black dark:text-white' >asdasdas</IconBox>
 * @param param0
 * @returns
 */
export const IconBox = ({ icon, children, pre = false, ...props }) => {
  const IC = Icons[icon]
  const { className = '' } = props

  return (
    <>
      {!pre && children}
      <IC {...props} className={`${className}`} />
      {pre && children}
    </>
  )
}
