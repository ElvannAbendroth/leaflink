'use client'

import Link from 'next/link'
import { FC } from 'react'
import { usePathname } from 'next/navigation'
import { Icons } from './Icons'

interface NavItem {
  label: string
  href: string
}

interface NavItemsProps {
  navItems: NavItem[]
}

export const NavItems: FC<NavItemsProps> = ({ navItems }) => {
  const pathname = usePathname()

  return (
    <ul className="flex items-center gap-8 ">
      {navItems.map(item => {
        const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
        return (
          <li key={item.label}>
            <Link
              className={`text-sm font-display lowercase font-semibold hover:underline underline-offset-4 decoration-2 hover:text-primary ${
                isActive ? 'underline text-foreground' : 'text-foreground-inactive'
              }`}
              href={item.href}
            >
              {item.label}
            </Link>
          </li>
        )
      })}
      <li>
        <Link href="/login">
          {' '}
          <Icons.logout
            className="cursor-pointer text-foreground-inactive hover:text-primary"
            size={20}
            strokeWidth={2.5}
          />
        </Link>
      </li>
    </ul>
  )
}
