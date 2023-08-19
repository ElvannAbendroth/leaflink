/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { CustomSession } from '@/lib/auth'
import userService from '@/services/userService'
import { useToast } from '@/lib/hooks/useToast'
import { Link, RegisterFormInputFields, UserData } from '@/lib/types'
import { signIn, signOut, useSession } from 'next-auth/react'
import { FC, ReactNode, createContext, useEffect, useState } from 'react'
import { redirect } from 'next/navigation'

type UserContextProps = {
  user: UserData | null
  updateUser: (dataToUpdate: {}) => void
  addLink: (linkObject: Link) => void
  removeLink: (linkToRemove: Link) => void
  updateLink: (linkToUpdate: Link) => void
  registerUser: (userInfo: RegisterFormInputFields) => void
  loginUser: (email: string, password: string) => void
  deleteUser: (id: string) => void
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  updateUser: () => {},
  addLink: () => {},
  removeLink: () => {},
  updateLink: () => {},
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
  const [user, setUser] = useState<UserData | null>(null)

  useEffect(() => {
    sessionData &&
      userService
        .getUserById(sessionData.user.id)
        .then(user => {
          setUser(user)
        })
        .catch(error => console.log(error))
  }, [setUser])

  const updateUser = async (dataToUpdate: any) => {
    if (!user) throw new Error('A link can only be added when a user is logged in')
    const payload = { ...dataToUpdate }
    userService
      .updateUser(user.id, payload)
      .then(data => {
        setUser(data)
        // toast({
        //   description: `User information was successfully updated!`,
        //   variant: 'default',
        // })
      })
      .catch(error => {
        toast({
          title: `${error}`,
          variant: 'danger',
        })
      })
  }

  const addLink = async (newLink: Link) => {
    if (!user) throw new Error('A link can only be added when a user is logged in')
    const payload = { links: [...user.links, newLink] }

    userService
      .updateUser(user.id, payload)
      .then(data => {
        setUser(data)
        toast({
          title: `New Link successfully added!`,
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

  const removeLink = async (linkToRemove: Link) => {
    //I only really need the id, but lets do that later
    if (!user) throw new Error('A link can only be added when a user is logged in')

    const payload = { links: user.links.filter(oldLink => linkToRemove._id != oldLink._id) }

    userService
      .updateUser(user.id, payload)
      .then(data => {
        setUser(data)
        toast({
          title: `Link successfully removed!`,
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

  const updateLink = async (linkToUpdate: Link) => {
    //I only really need the id, but lets do that later
    if (!user) throw new Error('A link can only be added when a user is logged in')

    const payload = { links: user.links.map(oldLink => (linkToUpdate._id != oldLink._id ? oldLink : linkToUpdate)) }

    userService
      .updateUser(user.id, payload)
      .then(data => {
        setUser(data)
      })
      .catch(error => {
        toast({
          title: `${error}`,
          variant: 'danger',
        })
      })
  }

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
      redirect: true,
      callbackUrl: '/dashboard',
    })

    if (res?.error)
      toast({
        title: `${res.error}`,
        variant: 'danger',
      })
  }
  const deleteUser = async (id: string) => {
    console.log(id)
    userService
      .deleteUser(id)
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
    <UserContext.Provider
      value={{ user, updateUser, addLink, removeLink, updateLink, registerUser, loginUser, deleteUser }}
    >
      {children}
    </UserContext.Provider>
  )
}
