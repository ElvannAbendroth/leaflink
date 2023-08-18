/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { FC, useContext } from 'react'
import { NavItem } from '@/lib/types'
import { MobileMenu } from '@/components//MobileMenu'
import { Logo } from '@/components/Logo'
import { UserContext } from './UserProvider'
import { ProfileDropdownMenu } from './ProfileDropdownMenu'
import { Icons } from './Icons'
import { signOut } from 'next-auth/react'
import { RemoveScroll } from 'react-remove-scroll'

interface NavbarProps {}

export const Navbar: FC<NavbarProps> = () => {
  const { user } = useContext(UserContext)

  const navItems: NavItem[] = [
    { type: 'page', label: 'Page Manager', href: '/dashboard', icon: Icons.dashboard },
    { type: 'page', label: 'Page Settings', href: '/profile', icon: Icons.settings },
    {
      type: 'page',
      label: 'View Page',
      href: `/view`,
      icon: Icons.preview,
    },
    { type: 'separator', label: 'separator 1', href: '#' },
    // { type: 'page', label: 'My Account', href: `/account`, icon: Icons.user },
    { type: 'button', label: 'Logout', href: '#', icon: Icons.logout, action: () => signOut() },
  ]

  return (
    <nav className={`bg-background py-6 px-8 fixed top-0 left-0 right-0 z-50  ${RemoveScroll.classNames.zeroRight}`}>
      <div className="flex justify-between max-w-layout mx-auto items-center">
        <Logo />

        <div id="nav-items" className={`flex items-center`}>
          <ProfileDropdownMenu navItems={navItems} />

          {/* <MobileMenu className="fixed sm:hidden" navItems={navItems} /> */}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
