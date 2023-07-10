import { Icons } from '@/components/Icons'
import Image from 'next/image'
import data from '@/lib/data'
import { notFound } from 'next/navigation'

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
          <Image
            className="rounded-full shadow-md"
            src={imageUrl}
            alt={`${username}'s Profile Picture`}
            width={120}
            height={120}
          />
        </a>
        <a target={websiteTarget} href={websiteRedirect} className="typo-p font-display font-semibold text-lg text">
          @{username}
        </a>
      </div>
      {links.map(link => (
        <a
          target="_blank"
          key={link.title}
          className="flex justify-center items-center bg-input rounded-lg hover:scale-105 transition-all"
          href={link.href}
        >
          <p className="typo-h4 p-6">{link.title}</p>
        </a>
      ))}

      <div className="mt-8 flex gap-8 justify-center ">
        {socials?.instagram && (
          <a target="_blank" className="text-muted hover:text-foreground transition-all" href={socials.instagram}>
            <Icons.instagram size={28} />
          </a>
        )}
        {socials?.facebook && (
          <a target="_blank" className="text-muted hover:text-foreground transition-all" href={socials.facebook}>
            <Icons.facebook size={28} />
          </a>
        )}
        {socials?.youtube && (
          <a target="_blank" className="text-muted hover:text-foreground transition-all" href={socials.youtube}>
            <Icons.youtube size={28} />
          </a>
        )}
        {socials?.twitter && (
          <a target="_blank" className="text-muted hover:text-foreground transition-all" href={socials.twitter}>
            <Icons.twitter size={28} />
          </a>
        )}
        {socials?.github && (
          <a target="_blank" className="text-muted hover:text-foreground transition-all" href={socials.github}>
            <Icons.gitHub size={28} />
          </a>
        )}
        {socials?.website && (
          <a target="_blank" className="text-muted hover:text-foreground transition-all" href={socials.website}>
            <Icons.link size={28} />
          </a>
        )}
      </div>
    </div>
  )
}
