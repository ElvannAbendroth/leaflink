import Image from 'next/image'
import { notFound } from 'next/navigation'
import { LinkCard } from '@/components/LinkCard'
import { ProfilePicture } from '@/components/ProfilePicture'

import data from '@/lib/data'
import { SocialLinks } from '@/components/SocialLinks'

export interface UserLinksPageProps {
  params: {
    username: string
  }
}

export default function UserLinksPage({ params }: UserLinksPageProps) {
  const { username, imageUrl, links, socials, website } = data
  const websiteRedirect = website ? website : '#'
  const websiteTarget = website ? '_blank' : '_self'

  if (params.username != username) {
    return notFound()
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-center items-center">
        <a target={websiteTarget} href={websiteRedirect}>
          <ProfilePicture src={imageUrl} />
        </a>
        <a target={websiteTarget} href={websiteRedirect} className="typo-p font-display font-semibold text-lg text">
          @{username}
        </a>
      </div>
      {links.map(link => (
        <LinkCard key={link.title} link={link} />
      ))}
      <SocialLinks socials={socials} />
    </div>
  )
}
