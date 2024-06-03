import Link from 'next/link'
import React, { FC, HTMLAttributes } from 'react'
import { Icons } from './Icons'
import { siteConfig } from '@/lib/config'

import { cn } from '@/lib/utils'

interface LogoProps {
  variant?: 'default' | 'icon'
  className?: string
}

export const Logo: FC<LogoProps> = ({ variant = 'default', className, ...props }) => {
  if (variant === 'icon')
    return (
      <div>
        <Link
          className={cn(
            'text-foreground hover:text-foreground-hover font-semibold text-2xl font-display flex gap-2 place-items-center',
            className
          )}
          href="/"
          {...props}
        >
          <Icons.logo strokeWidth={3} />
        </Link>
      </div>
    )
  return (
    <div>
      <Link
        className="font-semibold text-2xl font-display hover:text-gray-800 flex gap-2 place-items-center"
        href="/"
        {...props}
      >
        <Icons.logo strokeWidth={3} /> <span>{siteConfig.name}</span>
      </Link>
    </div>
  )
}
