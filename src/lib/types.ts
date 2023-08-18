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
  icon?: string | React.ReactNode
  hasSeparator?: boolean
  type: 'page' | 'button' | 'separator'
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
}

export type Link = {
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
