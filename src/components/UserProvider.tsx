/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { CustomSession } from '@/lib/auth'
import { getUserById } from '@/lib/data.client'
import { UserData } from '@/lib/types'
import { useSession } from 'next-auth/react'
import { FC, ReactNode, createContext, useEffect, useState } from 'react'

type UserContextProps = {
  user: UserData | null
}

export const UserContext = createContext<UserContextProps>({ user: null })

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const sessionData = useSession()?.data as CustomSession
  const [user, setUser] = useState<UserData | null>(null)

  useEffect(() => {
    console.log('🌈UserContext useEffect')
    sessionData &&
      getUserById(sessionData.user.id)
        .then(user => {
          setUser(user)
          console.log(user)
        })
        .catch(error => console.log(error))
  }, [])

  return <UserContext.Provider value={{ user: user }}>{children}</UserContext.Provider>
}
