import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const inputVariants = cva(
  [
    // 'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    // general styling
    'bg-input flex gap-3 rounded-full items-center justify-center self-stretch placeholder:text-muted/70 w-full',
    //focus states
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 ring-offset-background',
    //disabled states
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  {
    variants: {
      variant: {
        default: 'p-4 py-4 px-8',
        sm: 'py-3 px-6',
      },
      icon: {
        default: 'pl-16',
        none: '',
        sm: 'pl-14',
      },
    },
    defaultVariants: {
      variant: 'default',
      icon: 'default',
    },
  }
)

export type InputVariant = VariantProps<typeof inputVariants>

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, variant, type, icon, ...props }, ref) => {
  return <input type={type} className={cn(inputVariants({ variant, icon, className }))} ref={ref} {...props} />
})
Input.displayName = 'Input'

export { Input }