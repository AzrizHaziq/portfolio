import React from 'react'
import { MdEmail } from 'react-icons/md'
import { BsClipboard } from 'react-icons/bs'
import { FcCheckmark } from 'react-icons/fc'
import { HiOutlineRefresh } from 'react-icons/Hi'
import type { IconType, IconBaseProps } from 'react-icons'
import { SiDeno, SiRust, SiTypescript, SiJavascript } from 'react-icons/si'
import { FaMediumM, FaStackOverflow, FaGithub, FaDev, FaLinkedin, FaTwitter, FaArrowDown } from 'react-icons/fa'

const Icons: { [k: string]: IconType } = {
  // Social
  Github: FaGithub,
  Linkedin: FaLinkedin,
  Twitter: FaTwitter,
  SO: FaStackOverflow,
  email: MdEmail,

  // blogs
  Medium: FaMediumM,
  Devto: FaDev,

  // lang
  Deno: SiDeno,
  Rust: SiRust,
  TS: SiTypescript,
  JS: SiJavascript,
  ArrowDown: FaArrowDown,
  Refresh: HiOutlineRefresh,
  Copy: BsClipboard,
  CheckMark: FcCheckmark,
}

/**
 * @param param0
 * @returns
 */
export const IconBox = ({
  icon,
  children,
  pre = false,
  title,
  ...props
}: {
  icon: keyof typeof Icons
  children?: any
  title?: string
  pre?: boolean
  className?: string
} & IconBaseProps) => {
  const IC = Icons[icon]
  const iconTitle = title ?? (icon as string)

  return (
    <>
      {!pre && children}
      {IC({ title: iconTitle, className: `w-6 h-6 ${props.className}`, ...props })}
      {pre && children}
    </>
  )
}
