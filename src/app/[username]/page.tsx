/* eslint-disable react/no-unescaped-entities */
'use client'
import LinkCard from '@/components/LinkCard'
import { ProfilePicture } from '@/components/ProfilePicture'
import { SocialLinks } from '@/components/SocialLinks'
import { UserData } from '@/lib/types'
import { getUserByUsername } from '@/services/userService'
import { notFound, redirect } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Skeleton } from '@/components/ui/Skeleton'

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

  useEffect(() => {
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
    getUser()
  }, [username])

  if (!pageUser) return notFound()

  const activeLinks = pageUser.links.filter(link => link.isActive === true)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-center items-center">
        <a target="_blank" href={pageUser.website || '#'}>
          <ProfilePicture src={pageUser.imageUrl || 'images/unknown-user.png'} isLoading={isLoading} />
        </a>
        <a target="_blank" href={pageUser.website || '#'} className="typo-p font-display font-semibold text-lg text">
          @{pageUser.username || username}
        </a>
        {pageUser.description && <p className="my-6 text-center text-muted">{pageUser.description}</p>}
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
        <Skeleton className="flex justify-center items-center rounded-lg h-[72px]" />
      )}
    </div>
  )
}
