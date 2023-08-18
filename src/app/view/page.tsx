import { redirect } from 'next/navigation'
import { CustomSession, options } from '@/lib/auth'
import { getServerSession } from 'next-auth/next'
import { getUserById } from '@/lib/data.server'

export default async function ViewPage() {
  const session = (await getServerSession(options)) as CustomSession

  if (session) {
    console.log(session.user.id)
    const user = await getUserById(session.user.id)
    return redirect(`/${user.username}`)
  }
}
