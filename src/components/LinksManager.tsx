'use client'
import { FC, useState } from 'react'
import AddLinkForm from './AddLinkForm'
import { Link } from '@/lib/types'
import LinkCardDashboard from './LinkCardDashboard'
import { useSession } from 'next-auth/react'
import { CustomSession } from '@/lib/auth'
import { set } from 'mongoose'

interface LinksManagerProps {
  links: Link[]
}

export const LinksManager: FC<LinksManagerProps> = ({ links }) => {
  const [linkState, setLinksState] = useState<Link[]>(links)
  const session = useSession()?.data as CustomSession

  //TODO: Fix here, there's a but where some new links get deleted soon after their creation??
  const addLink = async (fieldValues: Link) => {
    console.log('🌈🌈🌈🌈LINK:', fieldValues)
    const res = await fetch(`/api/users/${session.user.id}`, {
      method: 'PUT',
      body: JSON.stringify({ links: [...linkState, fieldValues] }),
    })

    if (res?.ok) {
      const responseBody = await res.json()

      setLinksState(responseBody.user.links)
    }
  }

  const updateLink = async (link: Link) => {
    console.log('💖💖💖💖💖💖LINK:', link)
    // Updates the Links array with the updated link
    const updatedLinks = linkState.map(oldLink => (link._id != oldLink._id ? oldLink : link))

    const res = await fetch(`/api/users/${session.user.id}`, {
      method: 'PUT',
      body: JSON.stringify({ links: updatedLinks }),
    })
  }

  const removeLink = async (link: Link) => {
    console.log('💖💖💖💖💖💖LINK:', link)
    // Removes the link from the array
    const updatedLinks = linkState.filter(oldLink => link._id != oldLink._id)

    const res = await fetch(`/api/users/${session.user.id}`, {
      method: 'PUT',
      body: JSON.stringify({ links: updatedLinks }),
    })
    if (res?.ok) {
      const responseBody = await res.json()

      setLinksState(responseBody.user.links)
    }
  }

  return (
    <>
      <AddLinkForm addLink={addLink} />

      {linkState.map((link: Link) => (
        <LinkCardDashboard key={link._id} link={link} updateLink={updateLink} removeLink={removeLink} />
      ))}
    </>
  )
}
