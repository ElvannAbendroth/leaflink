import { FC } from 'react'
import { Button } from '@/components/ui/Button'
import { Icons } from '@/components/Icons'
import { Input } from '@/components/ui/Input'
import { InputGroup } from '@/components/ui/InputGroup'
import { Label } from '@/components/ui/Label'

interface RegisterFormProps {}

export const RegisterForm: FC<RegisterFormProps> = () => {
  return (
    <form action="/dashboard" className="flex flex-col gap-6">
      <InputGroup className="relative">
        <Label htmlFor="username">
          <Icons.logo /> leaf.link/
        </Label>
        <Input className="pl-32" type="text" name="username" placeholder="username" />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="email">
          <Icons.email />
        </Label>
        <Input type="text" placeholder="Enter your email" name="email" />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="password">
          <Icons.key />
        </Label>
        <Input type="password" placeholder="Choose your password" name="password" />
      </InputGroup>

      <Button variant="primary">Create account</Button>
    </form>
  )
}
