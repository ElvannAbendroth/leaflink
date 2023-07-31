import { Link, UserDocument } from '@/lib/types'

/* Function used in public page */
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

export async function updateUser(userId: string, payload: {}) {
  const res = await fetch(`/api/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    cache: 'no-store',
  })

  const body = await res.json()
  console.log(body)
  // Validates the Response Status
  if (!res?.ok) throw new Error(body.message)

  return body.user
}
