'use client'
import { FC, useState } from 'react'
import AddLinkForm from './AddLinkForm'
import { Link } from '@/lib/types'
import LinkCardDashboard from './LinkCardDashboard'
import { useSession } from 'next-auth/react'
import { CustomSession } from '@/lib/auth'

interface LinksManagerProps {
  links: Link[]
}

export const LinksManager: FC<LinksManagerProps> = ({ links }) => {
  const [linkState, setLinksState] = useState<Link[]>(links)
  const session = useSession()?.data as CustomSession

  const addLink = async (fieldValues: Link) => {
    // Creates the payload for the Links property by adding the field values to the existing state array
    const payload = { links: [...linkState, fieldValues] }

    //Sends a PUT request to the user with the body
    const res = await fetch(`/api/users/${session.user.id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    })

    // Validates the Response Status
    if (!res?.ok) throw new Error('There was an error adding this link!')

    // Updates the state with the response
    const responseBody = await res.json()
    setLinksState(responseBody.user.links)
  }

  const updateLink = async (link: Link) => {
    // Creates the payload for the new Links property by replacing the updated link from the state
    const payload = { links: linkState.map(oldLink => (link._id != oldLink._id ? oldLink : link)) }

    //Sends a PUT request to the user with the body
    const res = await fetch(`/api/users/${session.user.id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    })

    if (!res?.ok) throw new Error('There was an error updating this link!')
  }

  const removeLink = async (link: Link) => {
    // Removes the link from the array
    const updatedLinks = linkState.filter(oldLink => link._id != oldLink._id)

    const res = await fetch(`/api/users/${session.user.id}`, {
      method: 'PUT',
      body: JSON.stringify({ links: updatedLinks }),
    })

    if (!res?.ok) throw new Error('There was an error removing this link!')

    const responseBody = await res.json()
    setLinksState(responseBody.user.links)
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
