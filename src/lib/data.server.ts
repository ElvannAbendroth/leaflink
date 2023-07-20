import { getServerSession } from 'next-auth/next'
import { CustomSession, options } from '@/lib/auth'

export async function getSessionUser() {
  const session = (await getServerSession(options)) as CustomSession
  return session?.user
}

export async function getUserById(id: string) {
  console.log('getUserById', {
    id,
    env: process.env.VERCEL_URL,
    fullUrl: `${process.env.VERCEL_URL}/api/users/${id}`,
  })
  try {
    const res = await fetch(`${process.env.VERCEL_URL}/api/users/${id}`)
    const user = await res.json()
    return user
  } catch (error) {
    throw new Error(`There was an error fetching this user! ${error}`)
  }
}
