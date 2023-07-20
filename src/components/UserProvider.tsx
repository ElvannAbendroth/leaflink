/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { CustomSession } from '@/lib/auth'
import * as userService from '@/lib/data.client'
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
      })
      .catch(error => {
        console.log(error)
      })
  }

  const addLink = async (newLink: Link) => {
    if (!user) throw new Error('A link can only be added when a user is logged in')
    const payload = { links: [...user.links, newLink] }

    userService
      .updateUser(user.id, payload)
      .then(data => {
        setUser(data)
      })
      .catch(error => {
        console.log(error)
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
      })
      .catch(error => {
        console.log(error)
      })
  }

  const updateLink = async (linkToRemove: Link) => {
    //I only really need the id, but lets do that later
    if (!user) throw new Error('A link can only be added when a user is logged in')

    const payload = { links: user.links.map(oldLink => (linkToRemove._id != oldLink._id ? oldLink : linkToRemove)) }

    userService
      .updateUser(user.id, payload)
      .then(data => {
        setUser(data)
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <UserContext.Provider value={{ user: user, updateUser, addLink, removeLink, updateLink }}>
      {children}
    </UserContext.Provider>
  )
}
