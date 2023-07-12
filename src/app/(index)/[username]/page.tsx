import { notFound } from 'next/navigation'
import { LinkCard } from '@/components/LinkCard'
import { ProfilePicture } from '@/components/ProfilePicture'

import { users } from '@/lib/data'
import { SocialLinks } from '@/components/SocialLinks'

export interface UserLinksPageProps {
  params: {
    username: string
  }
}

export default function UserLinksPage({ params }: UserLinksPageProps) {
  const user = users.find(user => user.username.toLowerCase() === params.username.toLowerCase())

  if (!user) {
    return notFound()
  }

  const { username, imageUrl, links, socials, website } = user
  const websiteRedirect = website ? website : '#'
  const websiteTarget = website ? '_blank' : '_self'
  const activeLinks = links.filter(link => link.isActive === true)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-center items-center">
        <a target={websiteTarget} href={websiteRedirect}>
          <ProfilePicture src={imageUrl} />
        </a>
        <a target={websiteTarget} href={websiteRedirect} className="typo-p font-display font-semibold text-lg text">
          @{username.toLowerCase()}
        </a>
      </div>
      {activeLinks.map(link => (
        <LinkCard key={link.title} link={link} />
      ))}
      <SocialLinks socials={socials} />
    </div>
  )
}
