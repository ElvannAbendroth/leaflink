import AddLinkForm from '@/components/AddLinkForm'
import LinkCardEdit from '@/components/LinkCardEdit'
import Link from 'next/link'
import { ProfilePictureEditable } from '@/components/ProfilePicture'
import { redirect } from 'next/navigation'
import { options } from '@/lib/auth'
import { getServerSession } from 'next-auth/next'
import { UserDocument } from '@/lib/types'

export default async function DashboardPage() {
  const session = await getServerSession(options)

  if (!session?.user) {
    return redirect('/login')
  }

  const { username, imageUrl, links } = session.user as UserDocument

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
          @{username.toLowerCase()}
        </Link>
      </div>
      <AddLinkForm />
      {links.map(link => (
        <LinkCardEdit key={link.href} link={link} />
      ))}
    </div>
  )
}
