'use client'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/components/UserProvider'
import { useLinks } from './useLinks'
import clickService from '@/services/clickService'

export const useClicks = () => {
  const { user } = useContext(UserContext)
  const { unArchivedLinks } = useLinks()
  const [clicksGroupedByLinkId, setClicksGroupedByLinkId] = useState(null)
  const [totalProfileClicks, setTotalProfileClicks] = useState<number | null>(0)

  useEffect(() => {
    if (user) {
      clickService.getByUserId(user.id).then(clicks => {
        setClicksGroupedByLinkId(clicks)
        clicks.length === 0 && setTotalProfileClicks(0)

        const unArchivedLinksIds = unArchivedLinks.map(link => link.id)

        const totalClicksCount = clicks
          .filter((click: any) => unArchivedLinksIds?.includes(click.linkId))
          .reduce((acc: number, curr: any) => acc + curr.count, 0)
        setTotalProfileClicks(totalClicksCount)
      })
    }
  }, [user, unArchivedLinks])

  return { totalProfileClicks, clicksGroupedByLinkId }
}
