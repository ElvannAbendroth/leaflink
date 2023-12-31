'use client'
import { useContext, useEffect, useState } from 'react'
import { PostLinkRequest } from '@/app/api/links/route'
import linkService from '@/services/linkService'
import { UserContext } from '@/components/UserProvider'
import { useToast } from './useToast'
import { PatchLinkRequest } from '@/app/api/links/[id]/route'
import { useDebounce } from './useDebounce'

export const useLinks = () => {
  const { user } = useContext(UserContext)
  const [links, setLinks] = useState(user?.links)
  const { toast } = useToast()

  useEffect(() => {
    linkService
      .getAll()
      .then(data => {
        const newLinks = data.filter((link: any) => link.user.id === user?.id)
        setLinks(newLinks)
      })
      .catch(error => console.log(error))
  }, [setLinks, user])

  const unArchivedLinks = links?.filter(link => !link.isArchived) || []

  const addLink = (payload: PostLinkRequest) => {
    linkService
      .create(payload)
      .then(data => {
        setLinks(links?.concat(data))
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

  const updateLink = useDebounce(
    async (id: string, payload: PatchLinkRequest) => {
      linkService
        .update(id, payload)
        .then(data => {
          setLinks(links?.map(link => (link.id === id ? data : link)))
        })
        .catch(error => {
          toast({
            title: `${error}`,
            variant: 'danger',
          })
        })
    },
    [links]
  )

  const removeLink = async (id: string) => {
    linkService
      .remove(id)
      .then(data => {
        setLinks(links?.filter(link => link.id != id))
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

  return { links, addLink, removeLink, updateLink, unArchivedLinks }
}
