import { Icons } from '@/components/Icons'
import { cn } from '@/lib/utils'

interface AnalyticsPageProps {}

const stats = [
  { id: 1, name: 'Page Visits', stat: '56', icon: Icons.user, change: '122%', changeType: 'increase' },
  { id: 2, name: 'Links Clicked', stat: '18', icon: Icons.click, change: '5.4%', changeType: 'increase' },
  { id: 3, name: 'Avg. Click Rate', stat: '24%', icon: Icons.click, change: '3.2%', changeType: 'decrease' },
]

export default function AnalyticsPage({}) {
  return (
    <div className="">
      <h2 className="typo-h2">Analytics</h2>

      {/* <div>
        <h3 className="text-base font-semibold leading-6 text-foreground">Last 30 days</h3>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map(item => (
            <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-muted">{item.name}</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-foreground">{item.stat}</dd>
            </div>
          ))}
        </dl>
      </div> */}
      <div>
        <h3 className="text-base font-semibold leading-6 text-gray-900">Last 30 days</h3>

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
    </div>
  )
}
