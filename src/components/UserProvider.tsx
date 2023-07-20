/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { CustomSession } from '@/lib/auth'
import * as userService from '@/lib/data.client'
import { Link, UserData } from '@/lib/types'
import { useSession } from 'next-auth/react'
import { FC, ReactNode, createContext, useEffect, useState } from 'react'

type UserContextProps = {
  user: UserData | null
  addLink: (linkObject: Link) => void
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  addLink: () => {},
})

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const sessionData = useSession()?.data as CustomSession
  const [user, setUser] = useState<UserData | null>(null)

  useEffect(() => {
    console.log('🌈UserContext useEffect')
    sessionData &&
      userService
        .getUserById(sessionData.user.id)
        .then(user => {
          setUser(user)
          //console.log(user.links)
        })
        .catch(error => console.log(error))
  }, [setUser])

  const addLink = async (newLink: Link) => {
    if (!user) throw new Error('A link can only be added when a user is logged in')
    const payload = { links: [...user.links, newLink] }

    userService.updateUser(user.id, payload).then(data => {
      setUser(data)
    })
  }

  return <UserContext.Provider value={{ user: user, addLink }}>{children}</UserContext.Provider>
}
