'use client'
import { ChangeEventHandler, FC, FormEventHandler, useContext, useState } from 'react'
import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { InputGroup } from './ui/InputGroup'
import { UserContext } from './UserProvider'

interface LoginFormProps {}

interface FormInputValues {
  email: string
  password: string
}

export const LoginForm: FC<LoginFormProps> = () => {
  const { loginUser } = useContext(UserContext)
  const [userInfo, setUserInfo] = useState<FormInputValues>({
    email: '',
    password: '',
  })

  const { email, password } = userInfo

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target
    setUserInfo({ ...userInfo, [name]: value })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    loginUser(email, password)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* <InputGroup>
        <Label htmlFor="username">
          <Icons.logo /> leaf.link/
        </Label>
        <Input
          required={true}
          value={username}
          className="pl-32"
          type="text"
          name="username"
          placeholder="username"
          onChange={handleChange}
        />
      </InputGroup> */}

      <InputGroup>
        <Label htmlFor="email">
          <Icons.email />
        </Label>
        <Input required={true} value={email} type="email" name="email" placeholder="Email" onChange={handleChange} />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="Username">
          <Icons.key />
        </Label>
        <Input
          required={true}
          value={password}
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
      </InputGroup>

      <Button variant="primary">Log in</Button>
    </form>
  )
}
