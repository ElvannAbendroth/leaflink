'use client'
import { FC } from 'react'
import { Icons } from '@/components/Icons'
import { NavItem } from '@/lib/types'
import Link from 'next/link'
import { Logo } from '@/components/Logo'

interface MobileMenuProps {
  navItems: NavItem[]
  toggleMobileMenu: any
  handleSignOut: any
}

export const MobileMenu: FC<MobileMenuProps> = ({ navItems, toggleMobileMenu, handleSignOut }) => {
  return (
    <div onClick={toggleMobileMenu} className="bg-input fixed w-full top-0 bottom-0 left-0 py-6 px-8">
      <div id="mobile-menu-header" className="flex justify-between items-start place-content-start mb-10">
        <Logo />
        <button onClick={toggleMobileMenu}>
          <Icons.close />
        </button>
      </div>
      <div className="flex flex-col items-center gap-2">
        {navItems.map(item => {
          return (
            <Link
              key={`mobile-${item.label}`}
              href={item.href}
              className="text-foreground-faded hover:bg-muted/10 text-lg p-4 w-full text-center rounded-md font-semibold"
            >
              {item.label}
            </Link>
          )
        })}
        <button
          onClick={handleSignOut}
          className="text-foreground-faded hover:bg-muted/10 w-full p-4 text-lg text-center rounded-md flex gap-2 items-center place-content-center font-semibold cursor-pointer"
        >
          <Icons.logout className="" size={16} strokeWidth={3} />
          <span className="">Logout</span>
        </button>
      </div>
    </div>
  )
}
