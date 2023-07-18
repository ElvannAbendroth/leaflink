/* eslint-disable react/no-unescaped-entities */
'use client'
import { LinkCard } from '@/components/LinkCard'
import { ProfilePicture } from '@/components/ProfilePicture'
import { SocialLinks } from '@/components/SocialLinks'
import { UserData, UserDocument } from '@/lib/types'
import { getUserByUsername } from '@/lib/data.server'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'

export interface UserLinksPageProps {
  params: {
    username: string
  }
}

export default function UserLinksPage({ params }: UserLinksPageProps) {
  const initialUser = {
    username: '',
    imageUrl: '',
    links: [],
    socials: {},
    website: '',
    id: '',
    email: '',
  }
  const [pageUser, setPageUser] = useState<UserData | null>(initialUser)

  const getUserByUsername = async (username: string) => {
    console.log('Username: ', params.username)
    const res = await fetch(`/api/users/`, { cache: 'no-store' })

    if (!res?.ok) throw new Error('Error while fetching user.')
    const users = await res.json()

    const user = users.find((user: UserDocument) => user.username === params.username)

    if (!user) return notFound()
    setPageUser(user)
  }

  useEffect(() => {
    getUserByUsername(params.username)
  }, [])

  if (!pageUser) return notFound()

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
      {pageUser.links.length > 0 ? (
        activeLinks.map(link => <LinkCard key={link.title} link={link} />)
      ) : (
        <p className="typo-p text-center italic text-muted">This user doesn't have links to show yet!</p>
      )}
      <SocialLinks socials={pageUser.socials} />
    </div>
  )
}
