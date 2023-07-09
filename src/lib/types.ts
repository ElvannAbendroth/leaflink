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