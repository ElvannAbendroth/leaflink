/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Icons } from '@/components/Icons'
import { Link as LinkType } from '@/lib/types'
import { Switch } from '@/components/ui/Switch'
import { ChangeEventHandler, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog'
import { Button } from './ui/Button'
import { GetLinkResponse, PatchLinkRequest } from '@/app/api/links/[id]/route'
import clickService from '@/services/clickService'

interface LinkCardProps {
  link: GetLinkResponse
  type: 'public' | 'edit' | 'analytics'
  removeLink?: (id: string) => void
  updateLink?: (id: string, payload: PatchLinkRequest) => void
}

export default function LinkCard({ link, type, removeLink, updateLink }: LinkCardProps) {
  const [open, setOpen] = useState(false)
  const [fieldValues, setFieldValues] = useState<PatchLinkRequest>(link)
  const { title, href, isActive } = fieldValues
  const [totalClicks, setTotalClicks] = useState<number | null>(0)

  useEffect(() => {
    setFieldValues(link)
    clickService.getByUserId(link.user.id).then(clicks => {
      const filteredClicks = clicks.filter((clicks: any) => clicks.link.id === link.id)
      setTotalClicks(filteredClicks.length)
    })
  }, [link])

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target
    const newFieldValue = { ...fieldValues, [name]: value }
    setFieldValues(newFieldValue)
    updateLink!(link.id, newFieldValue)
  }

  const handleToggle: any = (checked: boolean) => {
    const updatedLink = { ...fieldValues, isActive: !fieldValues.isActive }
    setFieldValues(updatedLink)
    updateLink!(link.id, updatedLink)
  }

  const handleUserClick = () => {
    console.log('click!')
    clickService.create(link.id)
  }

  const handleDeleteButton = () => {
    setOpen(false)
    removeLink!(link.id)
  }

  if (type === 'public')
    return (
      <a
        target="_blank"
        className="flex justify-center items-center bg-input rounded-lg hover:scale-105 transition-all"
        href={href}
        onClick={handleUserClick}
      >
        <p className="typo-h4 p-4">{title}</p>
      </a>
    )

  if (type === 'analytics')
    return (
      <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow" key={link.id}>
        <span className="typo-p font-semibold">{link.title}</span>
        <div className="flex gap-2 text-muted">
          <span className="text-sm  flex gap-1">{totalClicks}</span>
          <Icons.click className=" " size={18} />
        </div>
      </div>
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
            <span>{totalClicks}</span>
            <Icons.analytics className="cursor-pointer text-muted hover:text-foreground transition-all" size={18} />
          </a>
          <a href="/view" target="_blank" title="view page">
            <Icons.preview className="cursor-pointer text-muted hover:text-foreground transition-all" size={18} />
          </a>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
              <Icons.trash
                aria-label="delete"
                className="cursor-pointer text-muted hover:text-danger transition-all"
                size={18}
              />
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
