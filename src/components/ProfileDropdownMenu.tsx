'use client'
import { FC, HTMLAttributes, useContext } from 'react'
import { Icons } from '@/components/Icons'
import { NavItem } from '@/lib/types'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { UserContext } from './UserProvider'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'

interface ProfileDropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  navItems: NavItem[]
}

export const ProfileDropdownMenu: FC<ProfileDropdownMenuProps> = ({ navItems, className }) => {
  const pathname = usePathname()
  const session = useSession()
  const { user } = useContext(UserContext)

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
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted/50 focus-visible:ring-offset-2 ring-offset-background">
          <Avatar>
            <AvatarImage src={user?.imageUrl} alt={`@${user?.username}`} />
            {/* <AvatarFallback>{user?.username[0].toUpperCase()}</AvatarFallback> */}
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 p-2" side="bottom" align="end" sideOffset={5} alignOffset={10}>
          {navItems.map(item => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)

            if (item.type === 'page')
              return (
                <DropdownMenuItem asChild key={`desktop-${item.label}`}>
                  <Link
                    className={`flex gap-2 w-full items-center text-foreground ${isActive && ' font-bold'}`}
                    href={item.href}
                  >
                    {item.icon && <item.icon size={16} />} {item.label}
                  </Link>
                </DropdownMenuItem>
              )
            if (item.type === 'separator') return <DropdownMenuSeparator key={item.label} />
            if (item.type === 'button')
              return (
                <DropdownMenuItem key={item.label} asChild>
                  <button className="flex gap-2 items-center w-full" onClick={item.action}>
                    <Icons.logout className="" size={16} /> Logout
                  </button>
                </DropdownMenuItem>
              )
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
