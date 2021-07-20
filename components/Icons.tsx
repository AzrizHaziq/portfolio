import React from 'react'
import { GoHome } from 'react-icons/go'
import { MdEmail } from 'react-icons/md'
import { BsClipboard } from 'react-icons/bs'
import { FcCheckmark } from 'react-icons/fc'
import type { IconType, IconBaseProps } from 'react-icons'
import { HiMenu, HiOutlineRefresh, HiX } from 'react-icons/Hi'
import { SiDeno, SiRust, SiTypescript, SiJavascript } from 'react-icons/si'
import {
  FaMediumM,
  FaStackOverflow,
  FaSun,
  FaGithub,
  FaDev,
  FaLinkedin,
  FaMoon,
  FaTwitter,
  FaArrowDown,
} from 'react-icons/fa'

export type IconBoxShape = {
  icon: keyof typeof Icons
  children?: React.ReactNode
  title?: string
  className?: string
} & IconBaseProps &
  Partial<{ id: string | undefined; url: string }>

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

  Home: GoHome,
  Moon: FaMoon,
  Sun: FaSun,
  XMark: HiX,
  Menu: HiMenu,
} as const

export const IconBox = ({ icon, children, title, ...props }: IconBoxShape) => {
  const IC = Icons[icon]
  const { className, ...rest } = props
  const iconTitle = title ?? (icon as string)

  return IC({ 'aria-hidden': 'true', title: iconTitle, className: `w-6 h-6 ${props.className}`, ...rest })
}
