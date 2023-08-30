'use client'
import { Icons } from '@/components/Icons'
import { UserContext } from '@/components/UserProvider'
import { cn } from '@/lib/utils'
import { useContext } from 'react'

interface AnalyticsPageProps {}

// const stats = [
//   { id: 1, name: 'Page Visits', stat: '56', icon: Icons.user, change: '122%', changeType: 'increase' },
//   { id: 2, name: 'Links Clicked', stat: '18', icon: Icons.click, change: '5.4%', changeType: 'increase' },
//   { id: 3, name: 'Avg. Click Rate', stat: '24%', icon: Icons.click, change: '3.2%', changeType: 'decrease' },
// ]

export default function AnalyticsPage({}) {
  const { user } = useContext(UserContext)

  const allClicks = user?.links.reduce((acc, curr) => acc.concat(curr.clicks), [] as Date[]) || '0'

  const stats = [
    {
      id: 1,
      name: 'Page Visits',
      stat: `${user?.visits?.length || 'N/A'}`,
      icon: Icons.user,
      change: '0%',
      changeType: 'increase',
    },
    {
      id: 2,
      name: 'Links Clicked',
      stat: `${allClicks?.length || 0}`,
      icon: Icons.click,
      change: '0%',
      changeType: 'increase',
    },
    { id: 3, name: 'Avg. Click Rate', stat: 'N/A', icon: Icons.click, change: '0%', changeType: 'decrease' },
  ]

  return (
    <div className="">
      <h2 className="typo-h2">Analytics</h2>

      <div>
        <h3 className="typo-h4">All Time</h3>

        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map(item => (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
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
                <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
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
          {user?.links
            ?.sort((a, b) => b.clicks?.length - a.clicks?.length)
            .map(link => (
              <div className="flex justify-between items-center p-4 bg-input rounded-lg" key={link.id}>
                <span className="typo-p font-semibold">{link.title}</span>
                <div className="flex gap-2 text-muted">
                  <span className="text-sm  flex gap-1">{link.clicks?.length | 0}</span>
                  <Icons.click className=" " size={18} />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
