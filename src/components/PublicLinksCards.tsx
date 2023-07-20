/* eslint-disable react/no-unescaped-entities */
import { UserData } from '@/lib/types'
import { LinkCard } from '@/components/LinkCard'

import { FC } from 'react'

interface PublicLinksCardsProps {
  user: UserData
}

export const PublicLinksCards: FC<PublicLinksCardsProps> = ({ user }) => {
  if (user.links.length === 0) {
    return <p className="typo-p text-center italic text-muted">This user doesn't have links to show yet!</p>
  }

  const activeLinks = user.links.filter(link => link.isActive === true)
  return activeLinks.map(link => <LinkCard key={link.title} link={link} />)
}
