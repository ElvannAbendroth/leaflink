export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  links: {
    twitter?: string
    github?: string
    behance?: string
    instagram?:string
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
  username: string
  email: string
  website?: string
  imageUrl: string
  links: Link[],
  socials: Social
 }

export type Link = {
  title: string
  href: string
}

export type Social = {
  instagram?:string
  facebook?: string
  youtube?: string
  twitter?: string
  github?: string
  website?: string
}