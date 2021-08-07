import React from 'react'
import type { IconBaseProps } from '@react-icons/all-files'

import { FaSun } from '@react-icons/all-files/fa/FaSun'
import { FaDev } from '@react-icons/all-files/fa/FaDev'
import { FaMoon } from '@react-icons/all-files/fa/FaMoon'
import { FaGithub } from '@react-icons/all-files/fa/FaGithub'
import { FaTwitter } from '@react-icons/all-files/fa/FaTwitter'
import { FaMediumM } from '@react-icons/all-files/fa/FaMediumM'
import { FaLinkedin } from '@react-icons/all-files/fa/FaLinkedin'
import { FaArrowDown } from '@react-icons/all-files/fa/FaArrowDown'
import { FaStackOverflow } from '@react-icons/all-files/fa/FaStackOverflow'
import { FaTimes } from '@react-icons/all-files/fa/FaTimes'
import { FaBars } from '@react-icons/all-files/fa/FaBars'

import { GoHome } from '@react-icons/all-files/go/GoHome'
import { MdEmail } from '@react-icons/all-files/md/MdEmail'
import { BsClipboard } from '@react-icons/all-files/bs/BsClipboard'
import { FcCheckmark } from '@react-icons/all-files/fc/FcCheckmark'
import { FiRefreshCw } from '@react-icons/all-files/fi/FiRefreshCw'

import { SiDeno } from '@react-icons/all-files/si/SiDeno'
import { SiRust } from '@react-icons/all-files/si/SiRust'
import { SiTypescript } from '@react-icons/all-files/si/SiTypescript'
import { SiJavascript } from '@react-icons/all-files/si/SiJavascript'

const IconsBox = {
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
  Refresh: FiRefreshCw,
  Copy: BsClipboard,
  CheckMark: FcCheckmark,

  Home: GoHome,
  Moon: FaMoon,
  Sun: FaSun,
  XMark: FaTimes,
  Menu: FaBars,
} as const

export type IconBoxShape = {
  icon: keyof typeof IconsBox
  children?: React.ReactNode
  title?: string
  className?: string
} & IconBaseProps &
  Partial<{ id: string | undefined; url: string }>

export const IconBox = ({ icon, children, title, ...props }: IconBoxShape) => {
  const IC = IconsBox[icon]
  const { className, ...rest } = props
  const iconTitle = title || (icon as string)

  return IC({ 'aria-hidden': 'true', title: iconTitle, className: `w-6 h-6 ${props.className}`, ...rest })
}
