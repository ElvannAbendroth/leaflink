/* eslint-disable react/no-unescaped-entities */
'use client'
import Link from 'next/link'
import { ProfilePictureEditable } from '@/components/ProfilePicture'
import AddLinkDialog from '@/components/AddLinkDialog'
import LinkCard from '@/components/LinkCard'
import { Link as LinkType } from '@/lib/types'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/components/UserProvider'
import { Skeleton } from '@/components/ui/Skeleton'
import { SocialLinks } from '@/components/SocialLinks'

export default function DashboardPage() {
  const { user } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    user ? setIsLoading(false) : setIsLoading(true)
  }, [user])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-center items-center">
        <ProfilePictureEditable src={user?.imageUrl || 'images/unknown-user.png'} isLoading={isLoading} />
        <p className="typo-p font-display font-semibold text-lg text flex gap-2 items-center hover:text-foreground hover:text-foreground/80">
          @{user?.username}
        </p>
        <p className="typo-p text-center rounded-lg px-8 items-start text-muted">{user?.description}</p>
      </div>
      <div className="flex flex-col  gap-4">
        <AddLinkDialog />
      </div>

      {!isLoading ? (
        <>
          {user?.links.length === 0 ? (
            <p className="typo-p text-center italic text-muted">Add a link to get started!</p>
          ) : (
            user?.links?.map((link: LinkType) => <LinkCard key={link._id} link={link} />)
          )}
          {/* {user?.socials && <SocialLinks socials={user.socials} />} */}
        </>
      ) : (
        <Skeleton className="flex justify-center items-center rounded-lg h-[172px]" />
      )}
    </div>
  )
}
