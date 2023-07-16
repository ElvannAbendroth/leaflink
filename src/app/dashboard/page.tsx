import Link from 'next/link'
import { ProfilePictureEditable } from '@/components/ProfilePicture'
import { redirect } from 'next/navigation'
import { CustomSession, options } from '@/lib/auth'
import { getServerSession } from 'next-auth/next'
import { LinksManager } from '@/components/LinksManager'
import User from '@/models/userModel'
import { UserData } from '@/lib/types'

export default async function DashboardPage() {
  const session = (await getServerSession(options)) as CustomSession

  if (!session?.user) {
    return redirect('/login')
  }

  const getUserId = async (id: string) => {
    const user = (await User.findById(id).lean()) as UserData
    if (!user) throw new Error("Coulnd't find user")
    //There's a warning in the console when passing down links because they have the _id property, but it seems to work anyways
    return user
  }

  const user = await getUserId(session?.user.id)

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
      <LinksManager links={user.links} />
    </div>
  )
}
