import { GetClickResponse } from '@/app/api/analytics/clicks/route'

export async function getByUserId(id: string) {
  const res = await fetch(`/api/analytics/clicks`)
  if (!res?.ok) throw new Error('Error while fetching statistics')
  const clicks = await res.json()
  const filteredClicks = clicks.filter((click: GetClickResponse) => click.link.user === id)

  return filteredClicks
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
