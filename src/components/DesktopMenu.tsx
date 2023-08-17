'use client'
import { FC, HTMLAttributes } from 'react'
import { Icons } from '@/components/Icons'
import { NavItem } from '@/lib/types'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { signOut } from 'next-auth/react'

interface DesktopMenuProps extends HTMLAttributes<HTMLDivElement> {
  navItems: NavItem[]
}

export const DesktopMenu: FC<DesktopMenuProps> = ({ navItems, className }) => {
  const pathname = usePathname()
  const session = useSession()

  const handleSignOut = () => {
    signOut()
  }

  if (session.status === 'unauthenticated')
    return (
      <Link
        href="/login"
        className="flex items-center gap-2 font-semibold hover:text-foreground text-muted cursor-pointer"
      >
        <Icons.login size={18} strokeWidth={3} />
      </Link>
    )

  return (
    <div className={cn('items-center gap-6', className)}>
      {navItems.map(item => {
        const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
        return (
          <Link
            key={`desktop-${item.label}`}
            className={`text-sm font-display lowercase font-semibold hover:underline underline-offset-4 decoration-2 hover:text-primary ${
              isActive ? 'underline text-foreground' : 'text-muted'
            }`}
            href={item.href}
          >
            {item.label}
          </Link>
        )
      })}
      <button onClick={handleSignOut}>
        <Icons.logout className="cursor-pointer text-muted hover:text-primary" size={18} strokeWidth={2.5} />
      </button>
    </div>
  )
}
