import { redirect } from 'next/navigation'
import { options } from '@/lib/auth'
import { getServerSession } from 'next-auth/next'

export default async function Home() {
  const session = await getServerSession(options)

  return session ? redirect('/dashboard') : redirect('/login')
}
