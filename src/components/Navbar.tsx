import Link from 'next/link'
import { FC } from 'react'
import { NavItems } from '@/components/NavItems'
import { siteConfig, navItems } from '@/lib/config'
import { Icons } from './Icons'
import { loggedUser, users } from '@/lib/data'

interface NavbarProps {}

export const Navbar: FC<NavbarProps> = () => {
  return (
    <nav className="bg-background py-6 px-8 fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between max-w-layout mx-auto">
        <Link
          className="font-semibold text-2xl font-display hover:text-gray-800 flex gap-2 place-items-center"
          href="/"
        >
          <Icons.logo strokeWidth={3} /> <span>{siteConfig.name}</span>
        </Link>

        {loggedUser && <NavItems navItems={navItems} />}
      </div>
    </nav>
  )
}
