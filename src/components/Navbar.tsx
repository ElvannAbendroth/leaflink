/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { FC, useContext } from 'react'
import { NavItem } from '@/lib/types'
import { MobileMenu } from '@/components//MobileMenu'
import { Logo } from '@/components/Logo'
import { UserContext } from './UserProvider'
import { DesktopMenu } from './DesktopMenu'

interface NavbarProps {}

export const Navbar: FC<NavbarProps> = () => {
  const { user } = useContext(UserContext)

  const navItems: NavItem[] = [
    { label: 'dashboard', href: '/dashboard' },
    { label: 'profile', href: '/profile' },
    { label: 'preview' || '#', href: `/${user?.username || '#'}` },
  ]

  return (
    <nav className="bg-background py-6 px-8 fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between max-w-layout mx-auto">
        <Logo />

        <div id="nav-items" className="flex items-center">
          <DesktopMenu className="hidden sm:flex" navItems={navItems} />

          <MobileMenu className="fixed sm:hidden" navItems={navItems} />
        </div>
      </div>
    </nav>
  )
}
