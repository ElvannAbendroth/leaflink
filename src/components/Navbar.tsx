import Link from 'next/link'
import { FC } from 'react'
import { NavItems } from '@/components/NavItems'
import { siteConfig } from '@/lib/config'
import { Icons } from './Icons'
import { getSessionUser } from '@/lib/data.server'

interface NavbarProps {}

export const Navbar: FC<NavbarProps> = async () => {
  // let user
  // if (sessionUser?.id) {
  //   user = (await User.findById(sessionUser?.id).lean()) as UserDocument
  // }

  const sessionUser = await getSessionUser()

  let user

  try {
    if (sessionUser && sessionUser.id) {
      const res = await fetch(`${process.env.VERCEL_URL}/api/users/${sessionUser.id}`, {
        method: 'GET',
        cache: 'no-store',
      })

      user = await res.json()
    }
  } catch (error) {
    console.log(error)
  }

  return (
    <nav className="bg-background py-6 px-8 fixed top-0 left-0 right-0 z-50">
      <div className="flex justify-between max-w-layout mx-auto">
        <Link
          className="font-semibold text-2xl font-display hover:text-gray-800 flex gap-2 place-items-center"
          href="/"
        >
          <Icons.logo strokeWidth={3} /> <span>{siteConfig.name}</span>
        </Link>

        {<NavItems username={user?.username} />}
      </div>
    </nav>
  )
}
