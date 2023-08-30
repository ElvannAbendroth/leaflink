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

export type User = {
  id: string
  username: string
}
export interface UserData extends User {
  description?: string
  name?: string
  email: string
  website?: string
  imageUrl?: string
  links: Link[]
  socials: Social
  visits: Date[]
}

export interface UserCredentials extends User {
  password: string
}

// Database User Document
export interface UserDocument extends Document {
  username: string
  description?: string
  name: string
  email: string
  password?: string
  imageUrl: string
  website?: string
  links: Link[]
  socials: Social
  visits: Date[]
}

export type Link = {
  title: string
  href: string
  isActive: boolean
  id: string
  clicks: Date[]
}

export type LinkFields = {
  title: string
  href: string
  isActive: boolean
  _id?: string
  id?: string
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
