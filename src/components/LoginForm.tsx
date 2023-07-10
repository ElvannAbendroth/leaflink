import { FC } from 'react'
import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { InputGroup } from './ui/InputGroup'

interface LoginFormProps {}

export const LoginForm: FC<LoginFormProps> = () => {
  return (
    <form action="/dashboard" className="flex flex-col gap-6">
      <InputGroup>
        <Label htmlFor="username">
          <Icons.logo /> leaf.link/
        </Label>
        <Input className="pl-32" type="text" name="username" placeholder="username" />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="Username">
          <Icons.key />
        </Label>
        <Input type="password" placeholder="Password" />
      </InputGroup>

      <Button variant="primary">Log in</Button>
    </form>
  )
}
