import { UserDocument } from '@/lib/types'

/* Function used in public page */
//TODO: Fix this cuz very not performant to loop through users like that.
export const getByUsername = async (username: string) => {
  const res = await fetch(`/api/users/`, { cache: 'no-store' })

  if (!res?.ok) throw new Error('Error while fetching user.')
  const users = await res.json()

  const user = users.find((user: UserDocument) => user.username.toLowerCase() === username.toLowerCase())
  return user
}

export async function getById(id: string) {
  const res = await fetch(`/api/users/${id}`)
  if (!res?.ok) throw new Error('Error while fetching user from UserDataContext')
  const user = await res.json()
  return user
}

export async function update(id: string, payload: {}) {
  const res = await fetch(`/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
    cache: 'no-store',
  })

  const body = await res.json()
  // Validates the Response Status
  if (!res?.ok) throw new Error(body.message)
  return body.user
}

export async function remove(id: string) {
  const res = await fetch(`/api/users/${id}`, {
    method: 'DELETE',
    cache: 'no-store',
  })

  const body = await res.json()
  // Validates the Response Status
  if (!res?.ok) return body.message

  return body.user
}

const userService = { getByUsername, getById, update, remove }

export default userService
