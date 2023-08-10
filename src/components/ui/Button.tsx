import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  [
    // general styling
    'flex gap-2 rounded-full items-center justify-center self-stretch w-full transition-all',
    //focus states
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-muted/50 focus-visible:ring-offset-2 ring-offset-background',
    //disabled states
    'disabled:opacity-50 disabled:pointer-events-none',
    //animations
    'transition-all',
  ],
  {
    variants: {
      variant: {
        default: 'bg-foreground text-background hover:bg-foreground-hover',
        primary: 'bg-primary text-primary-foreground hover:bg-primary-hover',
        danger: 'bg-danger text-danger-foreground hover:bg-danger-hover',
        link: 'bg-transparent text-foreground hover:text-primary',
        ghost: 'text-foreground hover:bg-foreground/5',
      },
      size: {
        default: 'py-4 px-8',
        sm: 'py-3 px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)
export type ButtonVariant = VariantProps<typeof buttonVariants>

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
