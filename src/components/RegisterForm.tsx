'use client'
import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Icons } from '@/components/Icons'
import { Input } from '@/components/ui/Input'
import { InputGroup } from '@/components/ui/InputGroup'
import { Label } from '@/components/ui/Label'
import { useRouter } from 'next/navigation'

interface RegisterFormProps {}

interface FormInputValues {
  username: string
  email: string
  password: string
}

export const RegisterForm: FC<RegisterFormProps> = () => {
  const [userInfo, setUserInfo] = useState<FormInputValues>({
    username: '',
    email: '',
    password: '',
  })
  const router = useRouter()
  const [formMessage, setFormMessage] = useState<string | null>(null)

  const { username, email, password } = userInfo

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target
    setUserInfo({ ...userInfo, [name]: value })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    addUser(userInfo)
  }

  const addUser = async (userInfo: FormInputValues) => {
    const res = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(userInfo),
    })

    res.ok ? router.push('/dashboard') : setFormMessage('Registration Failed')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {formMessage && <p className="text-danger">{formMessage}</p>}
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
