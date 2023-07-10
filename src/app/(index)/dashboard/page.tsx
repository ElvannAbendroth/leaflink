import Image from 'next/image'
import data from '@/lib/data'
import AddLinkForm from '@/components/AddLinkForm'
import LinkCardEdit from '@/components/LinkCardEdit'
import Link from 'next/link'
import { ProfilePictureEditable } from '@/components/ProfilePicture'

export default function DashboardPage() {
  const { username, imageUrl, links } = data
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-center items-center">
        <Link href="/profile">
          <ProfilePictureEditable src={imageUrl} />
        </Link>
        <Link
          href="/profile"
          className="typo-p font-display font-semibold text-lg text flex gap-2 items-center hover:text-foreground hover:text-foreground/80"
        >
          @{username}
        </Link>
      </div>
      <AddLinkForm />
      {links.map(link => (
        <LinkCardEdit key={link.href} link={link} />
      ))}
    </div>
  )
}
