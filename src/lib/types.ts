import { LucideIcon } from 'lucide-react'
import { Document } from 'mongoose'

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter?: string
    github?: string
    behance?: string
    instagram?: string
    youtube?: string
  }
  author: Author
}

export type NavItem = {
  label: string
  href: string
  action?: () => void
  disabled?: boolean
  icon?: LucideIcon
  type: 'page' | 'button' | 'separator' | 'tab'
}

export type Author = {
  name: string
  href: string
  image: string
}

//User Types

export interface User {
  id: string
  username: string
  description?: string
  name?: string
  email: string
  imageUrl: string
  website?: string
  links: Link[]
  socials: Social
  visits: Date[]
  theme?: ThemeValue
}

export type UserNoId = Omit<User, 'id'>

export interface UserCredentials {
  id: string
  username: string
  password: string
}

export type UserDocument = Document & Omit<User, 'id'> & { password?: string }

export type Link = {
  user: { id: string; email: string }
  title: string
  href: string
  isActive: boolean
  id: string
  clicks: Date[]
  isArchived: boolean
}

export type Social = {
  instagram?: string
  facebook?: string
  youtube?: string
  twitter?: string
  github?: string
  website?: string
}

export interface RegisterFormInputFields {
  username: string
  email: string
  password: string
}

export type ThemeValue = 'light' | 'dark' | 'green' | 'pink'
