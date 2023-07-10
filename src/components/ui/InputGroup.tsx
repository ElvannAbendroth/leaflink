import { FC } from 'react'

import { cn } from '@/lib/utils'

interface InputGroupProps extends React.HtmlHTMLAttributes<HTMLDivElement> {}

export const InputGroup: FC<InputGroupProps> = ({ className, children, ...props }) => {
  return (
    <div className={cn('relative', className)} {...props}>
      {children}
    </div>
  )
}
