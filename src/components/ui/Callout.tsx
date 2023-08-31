import { cn } from '@/lib/utils'

interface CalloutProps {
  icon?: string
  children?: React.ReactNode
  type?: 'default' | 'warning' | 'danger'
}

export default function Callout({ children, icon, type = 'default', ...props }: CalloutProps) {
  return (
    <div
      className={cn('shadow-lg shadow-foreground/10 my-6 flex items-start rounded-md border-l-4 p-4', {
        'border-danger-500 bg-danger-50 text-danger-950': type === 'danger',
        'border-warning-500 bg-warning-50 text-warning-950': type === 'warning',
      })}
      {...props}
    >
      {icon && <span className="mr-4 text-2xl">{icon}</span>}
      <div>{children}</div>
    </div>
  )
}
