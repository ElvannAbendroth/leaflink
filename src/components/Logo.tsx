import Link from 'next/link'
import { FC } from 'react'
import { Icons } from './Icons'
import { siteConfig } from '@/lib/config'

interface LogoProps {
  variant?: 'default' | 'icon'
}

export const Logo: FC<LogoProps> = ({ variant = 'default' }) => {
  if (variant === 'icon')
    return (
      <Link className="font-semibold text-2xl font-display hover:text-gray-800 flex gap-2 place-items-center" href="/">
        <Icons.logo strokeWidth={3} />
      </Link>
    )
  return (
    <Link className="font-semibold text-2xl font-display hover:text-gray-800 flex gap-2 place-items-center" href="/">
      <Icons.logo strokeWidth={3} /> <span>{siteConfig.name}</span>
    </Link>
  )
}
