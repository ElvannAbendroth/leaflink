import { FC } from 'react'
import * as React from 'react'

interface SocialIconProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export const SocialIcon: FC<SocialIconProps> = ({ href, children, target = '_blank', ...props }) => {
  return (
    <a target={target} className="text-muted/80 hover:text-foreground-hover transition-all" href={href} {...props}>
      {children}
    </a>
  )
}
