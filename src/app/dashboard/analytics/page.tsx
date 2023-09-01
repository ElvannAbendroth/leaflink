'use client'
import { Icons } from '@/components/Icons'
import LinkCard from '@/components/LinkCard'
import { UserContext } from '@/components/UserProvider'
import Callout from '@/components/ui/Callout'
import { useLinks } from '@/lib/hooks/useLinks'
import { cn } from '@/lib/utils'
import clickService from '@/services/clickService'
import { useContext, useEffect, useState } from 'react'

interface AnalyticsPageProps {}

export default function AnalyticsPage({}) {
  const { user } = useContext(UserContext)
  const { links } = useLinks()
  const [totalUserClicks, setTotalUserClicks] = useState<number | null>(0)

  useEffect(() => {
    if (user) {
      clickService.getByUserId(user.id).then(clicks => {
        setTotalUserClicks(clicks.length)
      })
    }
  }, [user])

  const stats = [
    {
      id: 1,
      name: 'Links Clicked',
      stat: `${totalUserClicks}`,
      icon: Icons.click,
      change: '0%',
      changeType: 'increase',
    },
    // {
    //   id: 2,
    //   name: 'Page Visits',
    //   stat: `${user?.visits?.length || 'N/A'}`,
    //   icon: Icons.user,
    //   change: '0%',
    //   changeType: 'increase',
    // },

    // { id: 3, name: 'Avg. Click Rate', stat: 'N/A', icon: Icons.click, change: '0%', changeType: 'decrease' },
  ]

  return (
    <div className="">
      <h2 className="typo-h2">Analytics</h2>
      <Callout type="warning">Feature currently in construction</Callout>

      <div>
        <h3 className="typo-h4">All Time</h3>

        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map(item => (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-lg bg-background px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
            >
              <dt>
                <div className="absolute rounded-md bg-primary p-3">
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-muted">{item.name}</p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{item.stat}</p>
                <p
                  className={cn(
                    item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                    'ml-2 flex items-baseline text-sm font-semibold flex-wrap'
                  )}
                >
                  {item.changeType === 'increase' ? (
                    <Icons.arrowUp className="h-5 w-5 flex-shrink-0 self-center text-success" aria-hidden="true" />
                  ) : (
                    <Icons.arrowDown className="h-5 w-5 flex-shrink-0 self-center text-danger" aria-hidden="true" />
                  )}

                  <span className="sr-only"> {item.changeType === 'increase' ? 'Increased' : 'Decreased'} by </span>
                  {item.change}
                </p>
                <div className="absolute inset-x-0 bottom-0 bg-input/50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      View all<span className="sr-only"> {item.name} stats</span>
                    </a>
                  </div>
                </div>
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div>
        <h3 className="typo-h4 mt-5">Top Clicked Links</h3>
        <div className="flex flex-col gap-4 mt-4">
          {links
            ?.sort((a, b) => b.clicks?.length - a.clicks?.length)
            .map(link => (
              <LinkCard key={link.id} link={link} type="analytics" />
            ))}
        </div>
      </div>
    </div>
  )
}
