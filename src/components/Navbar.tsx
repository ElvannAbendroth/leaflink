/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { FC, useEffect, useState, MouseEventHandler } from 'react'
import { usePathname } from 'next/navigation'
import { Icons } from '@/components/Icons'
import { signOut, useSession } from 'next-auth/react'
import { NavItem, UserData } from '@/lib/types'
import Link from 'next/link'
import { MobileMenu } from './MobileMenu'
import { Logo } from '@/components/Logo'

interface NavbarProps {}

export const Navbar: FC<NavbarProps> = () => {
  const pathname = usePathname()
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [username, setUsername] = useState('')

  const { data, status } = useSession()
  const sessionUser = data?.user as UserData

  useEffect(() => {
    if (status === 'authenticated' && sessionUser.id) {
      fetch(`/api/users/${sessionUser.id}`, { cache: 'no-store' })
        .then(res => res.json())
        .then(data => {
          setUsername(data.username)
        })
        .catch(error => console.log('There was an error fetching this user: ', error))
    }
  }, [])

  const navItems: NavItem[] = [
    { label: 'dashboard', href: '/dashboard' },
    { label: 'profile', href: '/profile' },
    // { label: 'preview', href: `/${username}` },
    { label: username, href: `/${username}` },
  ]

  const toggleMobileMenu: MouseEventHandler<HTMLButtonElement | HTMLDivElement> = e => {
    e.stopPropagation()
    setShowMobileMenu(!showMobileMenu)
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/login' })
  }

  return (
    <nav className="bg-background py-6 px-8 fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between max-w-layout mx-auto">
        <Logo />

        {status === 'authenticated' ? (
          <div id="nav-items" className="flex items-center">
            {/* Desktop Nav Items: shows only on desktop */}
            <div className="hidden sm:flex items-center gap-8">
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
              <button onClick={handleSignOut}>
                <Icons.logout
                  className="cursor-pointer text-foreground-inactive hover:text-primary"
                  size={20}
                  strokeWidth={2.5}
                />
              </button>
            </div>

            {/* Hamburger menu: shows only on mobile */}
            <button className="flex sm:hidden" onClick={toggleMobileMenu}>
              <Icons.menu />
            </button>

            {/* Mobile menu: can be toggled through the hamburger icon */}
            <div className="fixed sm:hidden">
              {showMobileMenu && (
                <MobileMenu navItems={navItems} toggleMobileMenu={toggleMobileMenu} handleSignOut={handleSignOut} />
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Login: shows when user isn't authenticated */}
            <Link href="/login" className="flex items-center">
              <Icons.login className="cursor-pointer hover:text-foreground text-muted" size={16} strokeWidth={3} />
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}
