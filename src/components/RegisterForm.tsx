import { FC } from 'react'
import { Button } from '@/components/ui/Button'
import { Icons } from '@/components/Icons'
import { Input } from '@/components/ui/Input'

interface RegisterFormProps {}

export const RegisterForm: FC<RegisterFormProps> = () => {
  return (
    <form action="/dashboard" className="flex flex-col gap-6">
      <div className="relative">
        <label className="absolute top-0 py-4 px-8 text-muted flex gap-2" htmlFor="username">
          <Icons.logo /> leaf.link/
        </label>
        <Input className="pl-32" type="text" name="username" placeholder="username" />
      </div>

      <div className="relative">
        <label className="absolute top-0 py-4 px-8 text-muted flex gap-2" htmlFor="email">
          <Icons.email />
        </label>
        <Input type="text" placeholder="Enter your email" name="email" />
      </div>

      <div className="relative">
        <label className="absolute top-0 py-4 px-8 text-muted flex gap-2" htmlFor="password">
          <Icons.key />
        </label>
        <Input type="password" placeholder="Choose your password" name="password" />
      </div>

      <Button variant="primary">Create account</Button>
    </form>
  )
}
