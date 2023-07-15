import AddLinkForm from '@/components/AddLinkForm'
import Link from 'next/link'
import { ProfilePictureEditable } from '@/components/ProfilePicture'
import { redirect } from 'next/navigation'
import { CustomSession, options } from '@/lib/auth'
import { getServerSession } from 'next-auth/next'
import LinkCardDashboard from '@/components/LinkCardDashboard'
import { Link as LinkType } from '@/lib/types'

export default async function DashboardPage() {
  const session = (await getServerSession(options)) as CustomSession

  if (!session?.user) {
    return redirect('/login')
  }

  const getUserById = async (id: string) => {
    const res = await fetch(`http://localhost:3000/api/users/${id}`)
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }

    const user = await res.json()
    return user
  }

  const user = await getUserById(session?.user.id)

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

      {user.links.map((link: LinkType) => (
        <LinkCardDashboard key={link.href} link={link} />
      ))}
    </div>
  )
}
