/* eslint-disable react/no-unescaped-entities */
'use client'
import LinkCard from '@/components/LinkCard'
import { ProfilePicture } from '@/components/ProfilePicture'
import { SocialLinks } from '@/components/SocialLinks'
import { UserData } from '@/lib/types'
import { getUserByUsername } from '@/lib/data.client'
import { notFound } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Icons } from '@/components/Icons'

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
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const getUser = async () => {
    try {
      setIsLoading(true)
      const user = await getUserByUsername(username)
      setPageUser(user)
      setIsLoading(false)
    } catch (error) {
      notFound()
    }
  }

  useEffect(() => {
    getUser()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!pageUser) return notFound()

  const websiteRedirect = pageUser.website || '#'
  const websiteTarget = pageUser.website ? '_blank' : '_self'
  const activeLinks = pageUser.links.filter(link => link.isActive === true)

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-center items-center">
        <a target={websiteTarget} href={websiteRedirect}>
          <ProfilePicture src={pageUser.imageUrl || 'images/unknown-user.png'} isLoading={isLoading} />
        </a>
        <a target={websiteTarget} href={websiteRedirect} className="typo-p font-display font-semibold text-lg text">
          @{username.toLowerCase()}
        </a>
      </div>
      {/* Displays active links to the user's profile */}
      {!isLoading ? (
        <>
          {activeLinks.length === 0 ? (
            <p className="typo-p text-center italic text-muted">This user doesn't have links to show yet!</p>
          ) : (
            activeLinks.map(link => <LinkCard key={link.title} link={link} isPublic={true} />)
          )}
          <SocialLinks socials={pageUser.socials} />
        </>
      ) : (
        <div className="flex justify-center items-center bg-input rounded-lg hover:scale-105 transition-all animate-pulse">
          <p className="typo-h4 p-6">
            {' '}
            <Icons.load className="text-muted/80 animate-spin items-center text-center mx-auto" />
          </p>
        </div>
      )}
    </div>
  )
}
