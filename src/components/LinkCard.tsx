'use client'
import { Icons } from '@/components/Icons'
import { Link as LinkType } from '@/lib/types'
import { Switch } from '@/components/ui/Switch'
import { ChangeEventHandler, useCallback, useContext, useEffect, useState } from 'react'
import debounce from 'lodash.debounce'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog'
import { Button } from './ui/Button'
import { PatchLinkRequest } from '@/app/api/links/[id]/route'

interface LinkCardProps {
  link: LinkType
  isPublic?: boolean
  removeLink?: (id: string) => void
  updateLink?: (id: string, payload: PatchLinkRequest) => void
}

export default function LinkCard({ link, isPublic = false, removeLink, updateLink }: LinkCardProps) {
  const [open, setOpen] = useState(false)
  const [fieldValues, setFieldValues] = useState<LinkType>(link)
  const { title, href, isActive } = fieldValues
  const request = updateLink ? debounce(updateLink, 500) : () => {}
  const debounceRequest = useCallback(request, [request]) //allows sending only 1 request after the debounce

  // useEffect(() => {
  //   setFieldValues(link)
  // }, [link, setFieldValues])

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target
    const newFieldValue = { ...fieldValues, [name]: value }
    setFieldValues(newFieldValue)
    debounceRequest(link.id, newFieldValue)
  }

  const handleToggle: any = (checked: boolean) => {
    const updatedLink = { ...fieldValues, isActive: !fieldValues.isActive }
    setFieldValues(updatedLink)
    updateLink!(link.id, updatedLink)
  }

  const handleDeleteButton = () => {
    setOpen(false)
    removeLink!(link.id)
  }

  // const handleUserClick = () => {
  //   const newDate = new Date()
  //   const updatedLink = { ...fieldValues, clicks: [...link.clicks, newDate] }
  //   updateLink(updatedLink)
  // }

  if (isPublic)
    return (
      <a
        target="_blank"
        className="flex justify-center items-center bg-input rounded-lg hover:scale-105 transition-all"
        href={href}
        // onClick={handleUserClick}
      >
        <p className="typo-h4 p-4">{title}</p>
      </a>
    )

  return (
    <div className="bg-gray-50 shadow-lg shadow-muted/30 flex gap-4 rounded-lg p-6 items-start ">
      <div className="flex flex-col gap-3 flex-grow max-w-full">
        <div className="flex gap-2 items-center justify-between">
          {/* <div className="flex gap-2 items-center typo-h4">{title}</div> */}
          <input
            className="flex gap-2 items-center typo-h4 focus-visible:outline-primary/50 rounded-full bg-transparent w-full"
            name="title"
            value={title}
            onChange={handleChange}
            type="text"
            placeholder="Title"
          />
          <div id="top-right-corner" className="flex gap-1">
            <Switch
              className="data-[state=unchecked]:bg-muted/20"
              value="on"
              name="isActive"
              checked={isActive}
              onCheckedChange={checked => handleToggle(checked)}
            />
          </div>
        </div>
        <div className="flex text-muted items-center pr-8 text-sm gap-1">
          <Icons.link size={16} className="min-w-[18px] " />
          <input
            name="href"
            value={href}
            onChange={handleChange}
            type="text"
            className="transition-all break-words overflow-auto focus-visible:outline-primary/50 rounded-full bg-transparent pl-2 w-full"
          />
        </div>

        <div className="flex flex-row justify-start items-center gap-4 border-t-2 pt-3 border-dotted">
          <a href="/view" target="_blank" title="view page" className="text-sm text-muted flex gap-1">
            <span>{link.clicks?.length | 0}</span>
            <Icons.analytics className="cursor-pointer text-muted hover:text-foreground transition-all" size={18} />
          </a>
          <a href="/view" target="_blank" title="view page">
            <Icons.preview className="cursor-pointer text-muted hover:text-foreground transition-all" size={18} />
          </a>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
              <Icons.trash className="cursor-pointer text-muted hover:text-danger transition-all" size={18} />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle asChild>
                  <h2 className="typo-h3 text-foreground text-left pl-2 ">
                    Are you sure sure you want to delete this link?
                  </h2>
                </DialogTitle>
              </DialogHeader>
              <div className="flex gap-2 justify-end">
                <Button variant="subtle" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleDeleteButton}>
                  Yes, delete this link!
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
