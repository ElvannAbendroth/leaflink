import Link from 'next/link'
import { FC, useContext } from 'react'
import { Icons } from './Icons'
import { siteConfig } from '@/lib/config'
import { SessionContext } from 'next-auth/react'

interface LogoProps {
  variant?: 'default' | 'icon'
}

export const Logo: FC<LogoProps> = ({ variant = 'default' }) => {
  const session = useContext(SessionContext)

  if (variant === 'icon')
    return (
      <Link
        className="text-foreground hover:text-foreground-hover font-semibold text-2xl font-display flex gap-2 place-items-center"
        href="/"
      >
        <Icons.logo strokeWidth={3} />
      </Link>
    )
  return (
    <Link className="font-semibold text-2xl font-display hover:text-gray-800 flex gap-2 place-items-center" href="/">
      <Icons.logo strokeWidth={3} /> <span>{siteConfig.name}</span>
    </Link>
  )
}
