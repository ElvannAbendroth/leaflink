/* eslint-disable react/no-unescaped-entities */
'use client'
import { LinkCard } from '@/components/LinkCard'
import { ProfilePicture } from '@/components/ProfilePicture'
import { SocialLinks } from '@/components/SocialLinks'
import { UserData } from '@/lib/types'
import { getUserByUsername } from '@/lib/data.client'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'
import { PublicLinksCards } from '@/components/PublicLinksCards'

export interface UserLinksPageProps {
  params: {
    username: string
  }
}

export default function UserLinksPage({ params: { username } }: UserLinksPageProps) {
  const initialUser = {
    username: '',
    imageUrl: '',
    links: [],
    socials: {},
    website: '',
    id: '',
    email: '',
  }
  const [pageUser, setPageUser] = useState<UserData>(initialUser)

  const getUser = async () => {
    try {
      const user = await getUserByUsername(username)
      setPageUser(user)
    } catch (error) {
      notFound()
    }
  }

  useEffect(() => {
    getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!pageUser) return notFound()
  if (pageUser.username === '') return null

  const websiteRedirect = pageUser.website ? pageUser.website : '#'
  const websiteTarget = pageUser.website ? '_blank' : '_self'
  const activeLinks = pageUser.links.filter(link => link.isActive === true)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-center items-center">
        <a target={websiteTarget} href={websiteRedirect}>
          <ProfilePicture src={pageUser.imageUrl || 'images/unknown-user.png'} />
        </a>
        <a target={websiteTarget} href={websiteRedirect} className="typo-p font-display font-semibold text-lg text">
          @{pageUser.username.toLowerCase()}
        </a>
      </div>
      <PublicLinksCards user={pageUser} />
      <SocialLinks socials={pageUser.socials} />
    </div>
  )
}
