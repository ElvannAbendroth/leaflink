export async function getAll(id: string) {
  const res = await fetch(`/api/users/${id}`)
  if (!res?.ok) throw new Error('Error while fetching user from UserDataContext')
  const user = await res.json()
  return user
}

export async function getById(id: string) {
  const res = await fetch(`/api/links/${id}`)
  if (!res?.ok) throw new Error('Error while fetching user from UserDataContext')
  const link = await res.json()
  return link
}

const linkService = { getAll, getById }

export default linkService
