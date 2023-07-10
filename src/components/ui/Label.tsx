import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const labelVariants = cva(
  [
    // general styling
    'absolute top-0  text-muted flex gap-2',
  ],
  {
    variants: {
      variant: {
        default: 'py-4 px-8',
        sm: 'py-3 px-6',
      },
    },
    defaultVariants: {
      variant: 'default', //default is with an icon
    },
  }
)

export type LabelVariant = VariantProps<typeof labelVariants>

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement>, VariantProps<typeof labelVariants> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, htmlFor, variant, ...props }, ref) => {
  return <label htmlFor={htmlFor} className={cn(labelVariants({ variant, className }))} ref={ref} {...props} />
})
Label.displayName = 'Label'

export { Label }
