import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const textareaVariants = cva(
  [
    // general styling
    'flex min-h-[80px] w-full rounded-3xl border border-input bg-input   placeholder:text-muted-foreground  ring-offset-background   placeholder:text-muted-foreground ',
    //focus states
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-ring',
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

export type TextareaVariant = VariantProps<typeof textareaVariants>

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, variant, icon, ...props }, ref) => {
  return <textarea className={cn(textareaVariants({ variant, icon, className }))} ref={ref} {...props} />
})
Textarea.displayName = 'Textarea'

export { Textarea }
