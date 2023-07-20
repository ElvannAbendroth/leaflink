import User from '@/models/userModel'
import { UserData, UserDocument } from './types'
import { getServerSession } from 'next-auth/next'
import { CustomSession, options } from '@/lib/auth'
import { notFound } from 'next/navigation'

export async function getSessionUser() {
  const session = (await getServerSession(options)) as CustomSession

  return session?.user
}

export async function getUserById(id: string) {
  try {
    const res = await fetch(`${process.env.VERCEL_URL}/api/users/${id}`)
    const user = await res.json()
    return user
  } catch (error) {
    throw new Error('There was an error fetching this user.')
  }
}

// export async function getUserByUsername(username: string) {
//   try {
//     const user = (await await User.findOne({ username: username }).lean()) as UserDocument
//     if (!user) notFound()
//     //There's a warning in the console when passing down links because they have the _id property, but it seems to work anyways
//     return user as UserData
//   } catch (error) {
//     throw new Error(`${error}`)
//   }

// let safeUser = {
//   ...user,
//   id: user?._id.toString(),
// }
// delete safeUser.password
// delete safeUser._id
// delete safeUser.__v
// }
