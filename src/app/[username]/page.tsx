/* eslint-disable react/no-unescaped-entities */
import { notFound } from 'next/navigation'
import { LinkCard } from '@/components/LinkCard'
import { ProfilePicture } from '@/components/ProfilePicture'
import { SocialLinks } from '@/components/SocialLinks'
import User from '@/models/userModel'
import { UserDocument } from '@/lib/types'

export interface UserLinksPageProps {
  params: {
    username: string
  }
}

export default async function UserLinksPage({ params }: UserLinksPageProps) {
  const user = await User.findOne({ username: params.username })

  if (!user) {
    return notFound()
  }

  const { username, imageUrl, links, socials, website } = user as UserDocument
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
      {user.links.length > 0 ? (
        activeLinks.map(link => <LinkCard key={link.title} link={link} />)
      ) : (
        <p className="typo-p text-center italic text-muted">This user doesn't have links to show yet!</p>
      )}
      <SocialLinks socials={socials} />
    </div>
  )
}
