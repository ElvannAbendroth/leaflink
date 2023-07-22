/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { CustomSession } from '@/lib/auth'
import * as userService from '@/lib/data.client'
import { useToast } from '@/lib/hooks/useToast'
import { Link, UserData } from '@/lib/types'
import { useSession } from 'next-auth/react'
import { FC, ReactNode, createContext, useEffect, useState } from 'react'

type UserContextProps = {
  user: UserData | null
  updateUser: (dataToUpdate: {}) => void
  addLink: (linkObject: Link) => void
  removeLink: (linkToRemove: Link) => void
  updateLink: (linkToUpdate: Link) => void
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  updateUser: () => {},
  addLink: () => {},
  removeLink: () => {},
  updateLink: () => {},
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
        toast({
          title: 'Success!',
          description: `User information was successfully updated!`,
          variant: 'inverted',
        })
      })
      .catch(error => {
        toast({
          title: 'Error!',
          description: `${error}`,
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
          title: 'Success!',
          description: `Your link "${newLink.title}" was successfully added!`,
          variant: 'inverted',
        })
      })
      .catch(error => {
        toast({
          title: 'Error!',
          description: `${error}`,
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
          title: 'Success!',
          description: `Your link "${linkToRemove.title}" was successfully removed!`,
          variant: 'inverted',
        })
      })
      .catch(error => {
        toast({
          title: 'Error!',
          description: `${error}`,
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
          title: 'Error!',
          description: `${error}`,
          variant: 'danger',
        })
      })
  }

  return (
    <UserContext.Provider value={{ user: user, updateUser, addLink, removeLink, updateLink }}>
      {children}
    </UserContext.Provider>
  )
}
