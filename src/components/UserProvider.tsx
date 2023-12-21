'use client'
import { CustomSession } from '@/lib/auth'
import userService from '@/services/userService'
import { useToast } from '@/lib/hooks/useToast'
import { RegisterFormInputFields, User } from '@/lib/types'
import { signIn, signOut, useSession } from 'next-auth/react'
import { FC, ReactNode, createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDebounce } from '@/lib/hooks/useDebounce'

type UserContextProps = {
  user: User | null
  updateUser: (dataToUpdate: {}) => void
  registerUser: (userInfo: RegisterFormInputFields) => void
  loginUser: (email: string, password: string) => void
  deleteUser: (id: string) => void
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  updateUser: () => {},
  registerUser: () => {},
  loginUser: () => {},
  deleteUser: () => {},
})

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const sessionData = useSession()?.data as CustomSession
  const { toast } = useToast()
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  useEffect(() => {
    sessionData &&
      userService
        .getById(sessionData.user.id)
        .then(user => {
          setUser(user)
        })
        .catch(error => console.log(error))
  }, [setUser, sessionData])

  const updateUser = useDebounce(
    async (dataToUpdate: any) => {
      if (!user) throw new Error('There is no user to update.')
      const payload = { ...dataToUpdate }
      userService
        .update(user.id, payload)
        .then(data => {
          setUser(data)
        })
        .catch(error => {
          toast({
            title: `${error}`,
            variant: 'danger',
          })
        })
    },
    [user]
  )

  const registerUser = async (userInfo: RegisterFormInputFields) => {
    const res = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(userInfo),
    })

    const body = await res.json()
    res.ok
      ? loginUser(userInfo.email, userInfo.password)
      : toast({
          title: 'Error',
          description: `${body.error}`,
          variant: 'danger',
        })
  }

  //TODO: Fix the notification on this function
  //the problem is the page gets refreshed before the toast runs
  const loginUser = async (email: string, password: string) => {
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
      callbackUrl: '/dashboard',
    })

    if (res?.error) {
      toast({
        title: `${res.error}`,
        variant: 'danger',
      })
    }
    if (res?.url) {
      router.push(res?.url)
    }
  }

  const deleteUser = async (id: string) => {
    userService
      .remove(id)
      .then(res => {
        signOut()
        toast({
          title: `Your account was deleted`,
          variant: 'inverted',
        })
      })
      .catch(error => {
        toast({
          title: `${error}`,
          variant: 'danger',
        })
      })
  }

  return (
    <UserContext.Provider value={{ user, updateUser, registerUser, loginUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  )
}
