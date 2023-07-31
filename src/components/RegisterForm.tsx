'use client'
import { ChangeEventHandler, FC, FormEventHandler, useContext, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Icons } from '@/components/Icons'
import { Input } from '@/components/ui/Input'
import { InputGroup } from '@/components/ui/InputGroup'
import { Label } from '@/components/ui/Label'
import { RegisterFormInputFields } from '@/lib/types'
import { UserContext } from './UserProvider'

interface RegisterFormProps {}

export const RegisterForm: FC<RegisterFormProps> = () => {
  const { registerUser } = useContext(UserContext)
  const [userInfo, setUserInfo] = useState<RegisterFormInputFields>({
    username: '',
    email: '',
    password: '',
  })

  // const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const { username, email, password } = userInfo

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target
    setUserInfo({ ...userInfo, [name]: value })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    registerUser(userInfo)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* {errorMessage && <p className="text-danger">{errorMessage}</p>} */}
      <InputGroup className="relative">
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
      </InputGroup>

      <InputGroup>
        <Label htmlFor="email">
          <Icons.email />
        </Label>
        <Input
          required={true}
          value={email}
          type="email"
          placeholder="Enter your email"
          name="email"
          onChange={handleChange}
        />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="password">
          <Icons.key />
        </Label>
        <Input
          required={true}
          value={password}
          type="password"
          placeholder="Choose your password"
          name="password"
          onChange={handleChange}
        />
      </InputGroup>

      <Button type="submit" variant="primary">
        Create account
      </Button>
    </form>
  )
}
