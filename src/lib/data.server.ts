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
    const user = (await User.findById(id).lean()) as UserDocument
    if (!user) throw new Error("Couldn't find user")
    //There's a warning in the console when passing down links because they have the _id property, but it seems to work anyways
    return user as UserData
  } catch (error) {
    console.log(error)
    throw new Error(`Error while querying data: ${error}`)
  }

  // let safeUser = {
  //   ...user,
  //   id: user?._id.toString(),
  // }
  // delete safeUser.password
  // delete safeUser._id
  // delete safeUser.__v
}

export async function getUserByUsername(username: string) {
  try {
    const user = (await await User.findOne({ username: username }).lean()) as UserDocument
    if (!user) notFound()
    //There's a warning in the console when passing down links because they have the _id property, but it seems to work anyways
    return user as UserData
  } catch (error) {
    throw new Error(`${error}`)
  }

  // let safeUser = {
  //   ...user,
  //   id: user?._id.toString(),
  // }
  // delete safeUser.password
  // delete safeUser._id
  // delete safeUser.__v
}
