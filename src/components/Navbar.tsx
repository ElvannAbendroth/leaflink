'use client'
import { FC, useContext } from 'react'
import { NavItem } from '@/lib/types'
import { MobileMenu } from '@/components//MobileMenu'
import { Logo } from '@/components/Logo'
import { ProfileDropdownMenu } from './ProfileDropdownMenu'
import { Icons } from '@/components/Icons'
import { signOut } from 'next-auth/react'
import { RemoveScroll } from 'react-remove-scroll'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Button, buttonVariants } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface NavbarProps {}

export const Navbar: FC<NavbarProps> = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentTab = searchParams.get('tab')
  const profileMenuItems: NavItem[] = [
    { type: 'page', label: 'Dashboard', href: '/dashboard', icon: Icons.dashboard },
    {
      type: 'page',
      label: 'View Page',
      href: `/view`,
      icon: Icons.preview,
    },
    { type: 'separator', label: 'separator 1', href: '#' },
    // { type: 'page', label: 'My Account', href: `/account`, icon: Icons.user },
    { type: 'page', label: 'My Account', href: '/account', icon: Icons.user },

    { type: 'button', label: 'Logout', href: '#', icon: Icons.logout, action: () => signOut() },
  ]

  const navItems: NavItem[] = [
    { type: 'page', label: 'Links', href: '/dashboard', icon: Icons.link },
    {
      type: 'page',
      label: 'Appearance',
      href: `/dashboard/appearance`,
      icon: Icons.style,
    },
    {
      type: 'page',
      label: 'Analytics',
      href: `/dashboard/analytics`,
      icon: Icons.analytics,
    },
    {
      type: 'page',
      label: 'Settings',
      href: `/dashboard/settings`,
      icon: Icons.settings,
    },
  ]

  const appearanceTabItems: NavItem[] = [
    {
      type: 'tab',
      label: 'Profile',
      href: `#`,
      icon: Icons.user,
    },
    {
      type: 'tab',
      label: 'Social',
      href: `#`,
      icon: Icons.social,
    },
    {
      type: 'tab',
      label: 'Theme',
      href: `#`,
      icon: Icons.brush,
    },
  ]

  return (
    <nav className={`bg-background fixed top-0 left-0 right-0 z-50 shadow-md  ${RemoveScroll.classNames.zeroRight}`}>
      <div className="flex justify-between max-w-layout mx-auto py-2 px-4 sm:px-8 border-b-2 sm:border-none border-input">
        <div className="flex items-center gap-3">
          <Logo variant="icon" />
          <div id="desktop-nav" className="hidden sm:flex items-center gap-2 text-sm ">
            {navItems.map(item => {
              const isActive = item.href === '/' ? pathname === '/' : pathname.endsWith(item.href)
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-2 hover:bg-input px-3 py-2 rounded-lg  ${isActive && 'bg-input'}`}
                >
                  {item.icon && <item.icon size={16} />}
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <Link className={cn(buttonVariants({ variant: 'outline', size: 'xs' }), '')} href="/view">
            <Icons.preview size={16} />
            <span>View</span>
          </Link>
          <ProfileDropdownMenu navItems={profileMenuItems} />
        </div>

        {/* <MobileMenu className="fixed sm:hidden" navItems={navItems} /> */}
      </div>
      <div id="mobile-nav" className="flex sm:hidden items-center w-full justify-between text-xs font-semibold">
        {pathname.startsWith('/dashboard') &&
          navItems.map(item => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.endsWith(item.href)
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex flex-col align-center items-center gap-2  sm:border-none border-primary grow py-2 ${
                  isActive && 'border-b-4'
                }`}
              >
                {item.icon && <item.icon size={16} />}
                <span>{item.label}</span>
              </Link>
            )
          })}
      </div>
      {pathname.startsWith('/dashboard/appearance') && (
        <div id="mobile-nav" className="border-t-2 border-input">
          <div className="flex items-center w-full justify-between text-xs font-semibold border-input max-w-layout mx-auto lg:gap-8 lg:px-8">
            {pathname.startsWith('/dashboard') &&
              appearanceTabItems.map(item => {
                const isActive = currentTab === item.label || (currentTab === null && item.label === 'Profile')
                return (
                  <Link
                    key={item.label}
                    href={`/dashboard/appearance?tab=${item.label}`}
                    className={`flex flex-col align-center items-center gap-2   border-primary grow py-2 ${
                      isActive && 'border-b-4'
                    }`}
                  >
                    {item.icon && <item.icon size={16} />}
                    <span>{item.label}</span>
                  </Link>
                )
              })}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
