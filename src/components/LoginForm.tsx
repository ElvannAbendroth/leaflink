import { FC } from 'react'
import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface LoginFormProps {}

export const LoginForm: FC<LoginFormProps> = () => {
  return (
    <form action="/dashboard" className="flex flex-col gap-6">
      <div className="relative">
        <label className="absolute top-0 py-4 px-8 text-muted flex gap-2" htmlFor="username">
          <Icons.logo /> leaf.link/
        </label>
        <Input className="pl-32" type="text" name="username" placeholder="username" />
      </div>

      <div className="relative">
        <label className="absolute top-0 py-4 px-8 text-muted flex gap-2" htmlFor="Username">
          <Icons.key />
        </label>
        <Input type="password" placeholder="Password" />
      </div>

      <Button variant="primary">Log in</Button>
    </form>
  )
}
