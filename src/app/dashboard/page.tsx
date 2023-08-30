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
import linkService from '@/services/linkService'
import { PostLinkRequest } from '../api/links/route'

export default function DashboardPage() {
  const { user } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [links, setLinks] = useState(user?.links)

  useEffect(() => {
    user ? setIsLoading(false) : setIsLoading(true)

    user ? setLinks(user.links) : null
  }, [user])

  const addLink = (payload: PostLinkRequest) => {
    linkService.create(payload).then(data => setLinks(links?.concat(data)))
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col justify-center items-center">
        <Link href="/dashboard/appearance">
          <ProfilePictureEditable src={user?.imageUrl || 'images/unknown-user.png'} isLoading={isLoading} />
        </Link>
        <p className="typo-p font-display font-semibold text-lg text flex gap-2 items-center hover:text-foreground hover:text-foreground/80">
          @{user?.username}
        </p>
        <p className="typo-p text-center rounded-lg px-8 items-start text-muted">{user?.description}</p>
      </div>
      <div className="flex flex-col  gap-4">
        <AddLinkDialog addLink={addLink} />
      </div>

      {!isLoading ? (
        <>
          {links?.length === 0 ? (
            <p className="typo-p text-center italic text-muted">Add a link to get started!</p>
          ) : (
            links?.map((link: LinkType) => <LinkCard key={link.id} link={link} />)
          )}
        </>
      ) : (
        <Skeleton className="flex justify-center items-center rounded-lg h-[172px]" />
      )}
    </div>
  )
}
