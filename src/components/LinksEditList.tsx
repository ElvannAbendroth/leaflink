'use client'
import { UserDocument } from '@/lib/types'
import { useSession } from 'next-auth/react'
import { FC } from 'react'
import LinkCardEdit from './LinkCardEdit'

interface LinksEditListProps {}

export const LinksEditList: FC<LinksEditListProps> = () => {
  const { data } = useSession()
  const sessionUser = data!.user as UserDocument

  // const getUser = async () => {
  //   const res = await fetch(`/api/users/${sessionUser.id}`, {
  //     method: 'GET',
  //   })
  //   return await res.json()
  // }

  // const userData = getUser() as UserDocument

  return (
    <>
      {sessionUser.links.map(link => (
        <LinkCardEdit key={link.href} link={link} />
      ))}
    </>
  )
}
