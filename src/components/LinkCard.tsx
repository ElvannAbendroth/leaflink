import { Link } from '@/lib/types'
import { FC } from 'react'

interface LinkCardProps {
  link: Link
}

export const LinkCard: FC<LinkCardProps> = ({ link }) => {
  const { title, href } = link
  return (
    <a
      target="_blank"
      className="flex justify-center items-center bg-input rounded-lg hover:scale-105 transition-all"
      href={href}
    >
      <p className="typo-h4 p-6">{title}</p>
    </a>
  )
}
