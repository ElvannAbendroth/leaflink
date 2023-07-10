import { FC } from 'react'
import { Icons } from '@/components/Icons'
import { Social } from '@/lib/types'
import { SocialIcon } from '@/components/SocialIcon'

interface SocialLinksProps {
  socials: Social
  iconSize?: number
}

export const SocialLinks: FC<SocialLinksProps> = ({ socials, iconSize = 28 }) => {
  const { instagram, facebook, youtube, twitter, github, website } = socials

  return (
    <div className="mt-8 flex gap-8 justify-center ">
      {instagram && (
        <SocialIcon href={instagram}>
          <Icons.instagram size={iconSize} />
        </SocialIcon>
      )}
      {facebook && (
        <SocialIcon href={facebook}>
          <Icons.facebook size={iconSize} />
        </SocialIcon>
      )}
      {youtube && (
        <SocialIcon href={youtube}>
          <Icons.youtube size={iconSize} />
        </SocialIcon>
      )}
      {twitter && (
        <SocialIcon href={twitter}>
          <Icons.twitter size={iconSize} />
        </SocialIcon>
      )}
      {github && (
        <SocialIcon href={github}>
          <Icons.gitHub size={iconSize} />
        </SocialIcon>
      )}
      {website && (
        <SocialIcon href={website}>
          <Icons.link size={iconSize} />
        </SocialIcon>
      )}
    </div>
  )
}
