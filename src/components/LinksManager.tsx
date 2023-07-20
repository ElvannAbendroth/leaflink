'use client'
import { FC, useContext, useEffect, useState } from 'react'
import AddLinkForm from './AddLinkForm'
import { Link } from '@/lib/types'
import LinkCardDashboard from './LinkCardDashboard'
import { UserContext } from './UserProvider'

interface LinksManagerProps {
  // links: Link[]
}

export const LinksManager: FC<LinksManagerProps> = () => {
  const { user, addLink } = useContext(UserContext)

  useEffect(() => {
    console.log('👋Hello from LinksManager')
    //console.log(user?.links)
  }, [])

  const updateLink = async (link: Link) => {
    // // Creates the payload for the new Links property by replacing the updated link from the state
    // const payload = { links: linkState.map(oldLink => (link._id != oldLink._id ? oldLink : link)) }
    // //Sends a PUT request to the user with the body
    // const res = await fetch(`/api/users/${user.id}`, {
    //   method: 'PUT',
    //   body: JSON.stringify(payload),
    //   cache: 'no-store',
    // })
    // if (!res?.ok) throw new Error('There was an error updating this link!')
    // const responseBody = await res.json()
    // console.log(responseBody.user.links)
    // setLinksState(responseBody.user.links)
  }

  const removeLink = async (link: Link) => {
    // // Removes the link from the array
    // const payload = linkState.filter(oldLink => link._id != oldLink._id)
    // const res = await fetch(`/api/users/${user.id}`, {
    //   method: 'PUT',
    //   body: JSON.stringify({ links: payload }),
    //   cache: 'no-store',
    // })
    // if (!res?.ok) throw new Error('There was an error removing this link!')
    // const responseBody = await res.json()
    // setLinksState(responseBody.user.links)
  }

  if (!user || !user.links) return null

  return (
    <>
      <AddLinkForm addLink={addLink} />

      {user?.links?.map((link: Link) => (
        <LinkCardDashboard key={link._id} link={link} updateLink={updateLink} removeLink={removeLink} />
      ))}
    </>
  )
}
