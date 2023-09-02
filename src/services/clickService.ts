export async function getByUserId(userId: string) {
  try {
    if (!userId) {
      throw new Error('Please provide a user Id')
    }
    const res = await fetch(`/api/analytics/clicks?userId=${userId}`, {
      method: 'GET',
      cache: 'no-store',
    })
    if (!res?.ok) throw new Error('Error while fetching statistics')
    const clicks = await res.json()
    return clicks
  } catch (error) {
    //console.log(error)
  }
}

export async function create(linkId: string) {
  const res = await fetch(`/api/analytics/clicks`, {
    method: 'POST',
    body: JSON.stringify({ link: linkId }),
    cache: 'no-store',
  })

  const body = await res.json()
  // Validates the Response Status
  if (!res?.ok) throw new Error(body.message)
  return body
}

const clickService = { create, getByUserId }

export default clickService
