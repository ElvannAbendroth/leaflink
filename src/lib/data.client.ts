import { UserDocument } from '@/lib/types'

export const getUserByUsername = async (username: string) => {
  const res = await fetch(`/api/users/`, { cache: 'no-store' })

  if (!res?.ok) throw new Error('Error while fetching user.')
  const users = await res.json()

  const user = users.find((user: UserDocument) => user.username === username)
  return user
}

export async function getUserById(id: string) {
  const res = await fetch(`/api/users/${id}`)
  if (!res?.ok) throw new Error('Error while fetching user from UserDataContext')
  const user = await res.json()
  return user
}
