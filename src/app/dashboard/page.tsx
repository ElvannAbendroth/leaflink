/* eslint-disable react/no-unescaped-entities */
'use client'
import Link from 'next/link'
import { ProfilePictureEditable } from '@/components/ProfilePicture'
import AddLinkForm from '@/components/AddLinkForm'
import LinkCard from '@/components/LinkCard'
import { Link as LinkType } from '@/lib/types'
import { useContext } from 'react'
import { UserContext } from '@/components/UserProvider'

export default function DashboardPage() {
  const { user } = useContext(UserContext)
  if (!user || !user.links) return null

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-center items-center">
        <Link href="/profile">
          <ProfilePictureEditable src={user.imageUrl} />
        </Link>
        <Link
          href="/profile"
          className="typo-p font-display font-semibold text-lg text flex gap-2 items-center hover:text-foreground hover:text-foreground/80"
        >
          @{user.username}
        </Link>
      </div>
      <AddLinkForm />

      {user.links.length === 0 ? (
        <p className="typo-p text-center italic text-muted">Add a link to get started!</p>
      ) : (
        user?.links?.map((link: LinkType) => <LinkCard key={link._id} link={link} />)
      )}
    </div>
  )
}
