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
  disabled?: boolean
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
  email: string
  website?: string
  imageUrl?: string
  links: Link[]
  socials: Social
}

export interface UserCredentials extends User {
  password: string
}

export type Link = {
  title: string
  href: string
  isActive: boolean
}

export type Social = {
  instagram?: string
  facebook?: string
  youtube?: string
  twitter?: string
  github?: string
  website?: string
}

// Database User Document
export interface UserDocument extends Document {
  username: string
  email: string
  password: string
  imageUrl: string
  website?: string
  links: Link[]
  socials: Social
}
