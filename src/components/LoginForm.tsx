'use client'
import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react'
import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { InputGroup } from './ui/InputGroup'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

interface LoginFormProps {}

export const LoginForm: FC<LoginFormProps> = () => {
  const { status } = useSession()
  const router = useRouter()

  //redirect authenticated users
  if (status === 'authenticated') {
    router.replace('/dashboard')
  }

  const [error, setError] = useState('')
  const [userInfo, setUserInfo] = useState({
    username: '',
    password: '',
  })

  const { username, password } = userInfo

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target
    setUserInfo({ ...userInfo, [name]: value })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    const res = await signIn('credentials', {
      username,
      password,
      redirect: false,
    })

    if (res?.error) return setError(res.error)
    router.replace('/dashboard')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {error && <p>{error}</p>}
      <InputGroup>
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
