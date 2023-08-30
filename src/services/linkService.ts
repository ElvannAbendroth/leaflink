export async function getAll(id: string) {
  const res = await fetch(`/api/links/${id}`)
  if (!res?.ok) throw new Error('Error while fetching user from UserDataContext')
  const link = await res.json()
  return link
}

export async function getById(id: string) {
  const res = await fetch(`/api/links/${id}`)
  if (!res?.ok) throw new Error('Error while fetching user from UserDataContext')
  const link = await res.json()
  return link
}

export async function create(payload: {}) {
  const res = await fetch(`/api/links/`, {
    method: 'POST',
    body: JSON.stringify(payload),
    cache: 'no-store',
  })

  const body = await res.json()
  // Validates the Response Status
  if (!res?.ok) throw new Error(body.message)
  return body
}

export async function remove(id: string) {
  const res = await fetch(`/api/links/${id}`, {
    method: 'DELETE',
    cache: 'no-store',
  })

  const body = await res.json()

  return body
}

export async function update(id: string, payload: {}) {
  const res = await fetch(`/api/links/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
    cache: 'no-store',
  })

  const body = await res.json()
  // Validates the Response Status
  if (!res?.ok) throw new Error(body.message)
  return body.link
}

const linkService = { getAll, getById, create, remove, update }

export default linkService
