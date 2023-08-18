/* eslint-disable react/no-unescaped-entities */
'use client'
import Link from 'next/link'
import { ProfilePictureEditable } from '@/components/ProfilePicture'
import AddLinkForm from '@/components/AddLinkForm'
import LinkCard from '@/components/LinkCard'
import { Link as LinkType } from '@/lib/types'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/components/UserProvider'
import { Skeleton } from '@/components/ui/Skeleton'
import { Button } from '@/components/ui/Button'
import { Icons } from '@/components/Icons'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog'

export default function DashboardPage() {
  const { user } = useContext(UserContext)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    user ? setIsLoading(false) : setIsLoading(true)
  }, [user])

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-center items-center">
        <Link href="/profile">
          <ProfilePictureEditable src={user?.imageUrl || 'images/unknown-user.png'} isLoading={isLoading} />
        </Link>
        <Link
          href="/profile"
          className="typo-p font-display font-semibold text-lg text flex gap-2 items-center hover:text-foreground hover:text-foreground/80"
        >
          @{user?.username}
        </Link>
        <Link href="/profile" className="typo-p text-center">
          {user?.description}
        </Link>
      </div>

      <AddLinkForm />

      {/* <Dialog>
        <DialogTrigger asChild>
          <Button variant="primary" size="sm">
            <Icons.add size={20} />
            Add link
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="typo-h2">Add a new link</DialogTitle>
          </DialogHeader>
          <AddLinkForm />
        </DialogContent>
      </Dialog> */}

      {!isLoading ? (
        <>
          {user?.links.length === 0 ? (
            <p className="typo-p text-center italic text-muted">Add a link to get started!</p>
          ) : (
            user?.links?.map((link: LinkType) => <LinkCard key={link._id} link={link} />)
          )}
        </>
      ) : (
        <Skeleton className="flex justify-center items-center rounded-lg h-[172px]" />
      )}
    </div>
  )
}
