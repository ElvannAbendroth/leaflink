'use client'

import Link from 'next/link'
import { FC, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Icons } from './Icons'
import { siteConfig } from '@/lib/config'
// import { useWindowWidth } from '@react-hook/window-size'

interface NavItem {
  label: string
  href: string
}

interface NavItemsProps {
  navItems: NavItem[]
}

export const NavItems: FC<NavItemsProps> = ({ navItems }) => {
  const pathname = usePathname()
  const [showMobileMenu, setShowMobileMenu] = useState<boolean>(false)

  const mobileMenu = () => {
    return (
      <div className="fixed">
        {showMobileMenu && (
          <div className="bg-input fixed w-full top-0 bottom-0 left-0 py-6 px-8">
            <div id="mobile-menu-header" className="flex justify-between items-start place-content-start mb-10">
              <Link
                className="font-semibold text-2xl font-display hover:text-gray-800 flex gap-2 place-items-center"
                href="/"
              >
                <Icons.logo strokeWidth={3} /> <span>{siteConfig.name}</span>
              </Link>
              <button onClick={e => setShowMobileMenu(!showMobileMenu)}>
                <Icons.close />
              </button>
            </div>
            <div className="flex flex-col items-center gap-2">
              {navItems.map(item => {
                return (
                  <Link
                    onClick={e => setShowMobileMenu(false)}
                    key={`mobile-${item.label}`}
                    href={item.href}
                    className="hover:bg-muted/10 text-lg p-4 w-full text-center rounded-md"
                  >
                    {item.label}
                  </Link>
                )
              })}
              <Link
                href="/login"
                className="hover:bg-muted/10 w-full p-4 text-lg text-center rounded-md flex gap-2 items-center place-content-center"
              >
                <Icons.logout className="cursor-pointer " size={16} strokeWidth={2} />
                <span className="">Logout</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex items-center">
      <div id="desktop-nav-items" className="hidden sm:flex items-center gap-8">
        {navItems.map(item => {
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
          return (
            <Link
              key={`desktop-${item.label}`}
              className={`text-sm font-display lowercase font-semibold hover:underline underline-offset-4 decoration-2 hover:text-primary ${
                isActive ? 'underline text-foreground' : 'text-foreground-inactive'
              }`}
              href={item.href}
            >
              {item.label}
            </Link>
          )
        })}
        <Link href="/login">
          <Icons.logout
            className="cursor-pointer text-foreground-inactive hover:text-primary"
            size={20}
            strokeWidth={2.5}
          />
        </Link>
      </div>

      {mobileMenu()}

      <button className="flex sm:hidden" onClick={e => setShowMobileMenu(!showMobileMenu)}>
        <Icons.menu />
      </button>
    </div>
  )
}
