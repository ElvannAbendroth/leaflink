'use client'
import { CustomSession } from '@/lib/auth'
import userService from '@/services/userService'
import { useToast } from '@/lib/hooks/useToast'
import { RegisterFormInputFields, UserData } from '@/lib/types'
import { signIn, signOut, useSession } from 'next-auth/react'
import { FC, ReactNode, createContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import linkService from '@/services/linkService'
import { PostLinkRequest } from '@/app/api/links/route'
import { PatchLinkRequest } from '@/app/api/links/[id]/route'

type UserContextProps = {
  user: UserData | null
  updateUser: (dataToUpdate: {}) => void
  addLink: (data: PostLinkRequest) => void
  removeLink: (id: string) => void
  updateLink: (id: string, payload: PatchLinkRequest) => void
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

  const updateUser = async (dataToUpdate: any) => {
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
  }

  const addLink = async (data: PostLinkRequest) => {
    if (!user) throw new Error('A link can only be added when a user is logged in')

    linkService
      .create(data)
      .then(data => {
        setUser({ ...user, links: [...user.links.concat(data)] })
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

  const removeLink = async (id: string) => {
    if (!user) throw new Error('A link can only be removed when a user is logged in')

    // const payload = { links: user.links.filter(oldLink => id._id != oldLink._id) }

    linkService
      .remove(id)
      .then(data => {
        setUser({ ...user, links: user.links.filter(link => link.id != id) })
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

  const updateLink = async (id: string, payload: PatchLinkRequest) => {
    //I only really need the id, but lets do that later
    if (!user) throw new Error('A link can only be updated when a user is logged in')

    // const payload = { links: user.links.map(oldLink => (linkToUpdate.id != oldLink.id ? oldLink : linkToUpdate)) }

    linkService
      .update(id, payload)
      .then(data => {
        setUser({ ...user, links: user.links.map(link => (link.id === id ? data : link)) })
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
    <UserContext.Provider
      value={{ user, updateUser, addLink, removeLink, updateLink, registerUser, loginUser, deleteUser }}
    >
      {children}
    </UserContext.Provider>
  )
}
