/* eslint-disable react/no-unescaped-entities */
'use client'
import LinkCard from '@/components/LinkCard'
import { ProfilePicture } from '@/components/ProfilePicture'
import { SocialLinks } from '@/components/SocialLinks'
import { UserData } from '@/lib/types'
import userService from '@/services/userService'
import { notFound } from 'next/navigation'
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
    visits: [],
  }
  const [pageUser, setPageUser] = useState<UserData>(initialUser)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true)
        const user = await userService.getByUsername(username)
        setPageUser(user)
        setIsLoading(false)
      } catch (error) {
        notFound()
      }
    }
    getUser()
  }, [username])

  if (!pageUser) return notFound()

  const publicLinks = pageUser.links.filter(link => link.isActive === true).filter(link => !link.isArchived)

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col justify-center items-center">
        <a target="_blank" href={pageUser.website || '#'}>
          <ProfilePicture
            src={pageUser.imageUrl || 'images/unknown-user.png'}
            isLoading={isLoading}
            className="hover:shadow-lg hover:opacity-90 transition-all hover:scale-105"
          />
        </a>
        <a target="_blank" href={pageUser.website || '#'} className="typo-p font-display font-semibold text-lg text">
          @{pageUser.username || username}
        </a>
        {pageUser.description && <p className="my-6 text-center text-muted">{pageUser.description}</p>}
      </div>

      {/* Displays active links to the user's profile */}
      {!isLoading ? (
        <>
          {publicLinks.length === 0 ? (
            <p className="typo-p text-center italic text-muted -mt-14 sm:mt-0">
              This user doesn't have links to show yet!
            </p>
          ) : (
            publicLinks.map(link => <LinkCard key={link.title} link={link} type="public" />)
          )}
          <SocialLinks socials={pageUser.socials} />
        </>
      ) : (
        <Skeleton className="flex justify-center items-center rounded-lg h-[72px]" />
      )}
    </div>
  )
}
