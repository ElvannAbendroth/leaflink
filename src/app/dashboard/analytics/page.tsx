interface AnalyticsPageProps {}

const stats = [
  { name: 'Total Subscribers', stat: '71,897' },
  { name: 'Avg. Open Rate', stat: '58.16%' },
  { name: 'Avg. Click Rate', stat: '24.57%' },
]

export default function AnalyticsPage({}) {
  return (
    <div className="">
      <h2 className="typo-h2">Analytics</h2>

      <div>
        <h3 className="text-base font-semibold leading-6 text-foreground">Last 30 days</h3>
        <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          {stats.map(item => (
            <div key={item.name} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <dt className="truncate text-sm font-medium text-muted">{item.name}</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight text-foreground">{item.stat}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
