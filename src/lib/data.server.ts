import User from '@/models/userModel'
import { UserData, UserDocument } from './types'
import { getServerSession } from 'next-auth/next'
import { CustomSession, options } from '@/lib/auth'

export async function getSessionUser() {
  const session = (await getServerSession(options)) as CustomSession

  return session?.user
}

const getUserById = async (id: string) => {
  let user

  try {
    user = (await User.findById(id).lean()) as UserDocument
    if (!user) throw new Error("Couldn't find user")
  } catch (error) {
    console.log(error)
  }

  let safeUser = {
    ...user,
    id: user?._id.toString(),
  }
  delete safeUser.password
  delete safeUser._id
  delete safeUser.__v

  //There's a warning in the console when passing down links because they have the _id property, but it seems to work anyways
  return safeUser as UserData
}

export { getUserById }
