import Link from 'next/link'
import { ProfilePictureEditable } from '@/components/ProfilePicture'
import { LinksManager } from '@/components/LinksManager'
import { getSessionUser, getUserById } from '@/lib/data.server'

export default async function DashboardPage() {
  const sessionUser = await getSessionUser()
  const user = await getUserById(sessionUser.id)

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
      <LinksManager />
    </div>
  )
}
