/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Icons } from '@/components/Icons'
import { Link as LinkType } from '@/lib/types'
import { Switch } from '@/components/ui/Switch'
import { ChangeEventHandler, useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog'
import { Button } from './ui/Button'
import { GetLinkResponse, PatchLinkRequest } from '@/app/api/links/[id]/route'
import clickService from '@/services/clickService'
import Link from 'next/link'

interface LinkCardProps {
  link: GetLinkResponse
  type: 'public' | 'edit' | 'analytics' | 'archive'
  removeLink?: (id: string) => void
  updateLink?: (id: string, payload: PatchLinkRequest) => void
}

export default function LinkCard({ link, type, removeLink, updateLink }: LinkCardProps) {
  const [openArchiveDialog, setOpenArchiveDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [fieldValues, setFieldValues] = useState<PatchLinkRequest>(link)
  const { title, href, isActive } = fieldValues
  const [totalClicks, setTotalClicks] = useState<number | null>(null)

  useEffect(() => {
    setFieldValues(link)

    if (link) {
      clickService.getByUserId(link.user.id).then(clicks => {
        const linkClicks = clicks ? clicks.find((click: any) => click.linkId === link.id) : null
        setTotalClicks(linkClicks ? linkClicks.count : 0)
      })
    }
  }, [link])

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target
    const newFieldValue = { [name]: value }
    setFieldValues({ ...fieldValues, ...newFieldValue })
    updateLink!(link.id, newFieldValue)
  }

  const handleToggle: any = (checked: boolean) => {
    const updatedLink = { isActive: !fieldValues.isActive }
    setFieldValues({ ...fieldValues, ...updatedLink })
    updateLink!(link.id, updatedLink)
  }

  const handleUserClick = () => {
    clickService.create(link.id)
  }

  const handleDeleteButton = () => {
    setOpenArchiveDialog(false)
    removeLink!(link.id)
  }

  const handleArchiveButton = () => {
    const updatedLink = { isArchived: !fieldValues.isArchived }
    setFieldValues({ ...fieldValues, ...updatedLink })
    setOpenArchiveDialog(false)
    updateLink!(link.id, updatedLink)
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
      <Link
        href="/dashboard"
        className="flex justify-between items-center p-4 bg-white rounded-lg shadow hover:scale-[102%] transition-all duration-200 outline-input outline outline-1"
        key={link.id}
      >
        <span className="typo-p font-semibold">{link.title}</span>
        <div className="flex gap-2 text-muted">
          <span className="text-sm  flex gap-1">{totalClicks}</span>
          <Icons.click className=" " size={18} />
        </div>
      </Link>
    )

  if (type === 'archive')
    return (
      <div
        className="flex justify-between items-center p-4 bg-white rounded-lg shadow transition-all duration-200 outline-input outline outline-1"
        key={link.id}
      >
        <div className="flex gap-4">
          <Dialog open={openArchiveDialog} onOpenChange={setOpenArchiveDialog}>
            <DialogTrigger
              title="restore archive"
              className="h-12 w-12 flex justify-center items-center bg-primary hover:bg-primary-hover rounded-lg shadow transition-all"
            >
              <Icons.archiveRestore className="cursor-pointer text-primary-foreground  transition-all" size={24} />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle asChild>
                  <h2 className="typo-h3 text-foreground text-left ">
                    {!fieldValues.isArchived
                      ? 'Are you sure sure you want to archive this link?'
                      : 'Are you sure you want to restore this link?'}
                  </h2>
                </DialogTitle>
                {!fieldValues.isArchived && (
                  <DialogDescription>You can always visit the archive page to restore it.</DialogDescription>
                )}
              </DialogHeader>
              <div className="flex gap-2 justify-end">
                <Button variant="subtle" onClick={() => setOpenArchiveDialog(false)}>
                  Cancel
                </Button>
                <Button variant="default" onClick={handleArchiveButton}>
                  {!fieldValues.isArchived ? 'Yes, archive this link!' : 'Yes, restore this link!'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <a href={link.href} target="_blank" className="flex flex-col">
            <span className="typo-p font-semibold">{link.title}</span>
            <span className=" text-muted italic">{link.href}</span>
          </a>
        </div>

        <div className="flex gap-4">
          <div className="flex gap-1 text-muted">
            <span className="text-sm  flex gap-1">{totalClicks}</span>
            <Icons.click className=" " size={18} />
          </div>

          <Dialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
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
                <Button variant="subtle" onClick={() => setOpenArchiveDialog(false)}>
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
          <a
            href="/dashboard/analytics"
            title="analytics"
            className="text-sm  flex gap-1 text-muted hover:text-foreground"
          >
            <span>{totalClicks}</span>
            <Icons.analytics className="cursor-pointer  transition-all" size={18} />
          </a>
          <a href="/view" target="_blank" title="view page">
            <Icons.preview className="cursor-pointer text-muted hover:text-foreground transition-all" size={18} />
          </a>

          <Dialog open={openArchiveDialog} onOpenChange={setOpenArchiveDialog}>
            <DialogTrigger>
              <Icons.archive className="cursor-pointer text-muted hover:text-foreground transition-all" size={18} />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle asChild>
                  <h2 className="typo-h3 text-foreground text-left ">
                    {!fieldValues.isArchived
                      ? 'Are you sure sure you want to archive this link?'
                      : 'Are you sure you want to restore this link?'}
                  </h2>
                </DialogTitle>
                {!fieldValues.isArchived && (
                  <DialogDescription>You can always visit the archive page to restore it.</DialogDescription>
                )}
              </DialogHeader>
              <div className="flex gap-2 justify-end">
                <Button variant="subtle" onClick={() => setOpenArchiveDialog(false)}>
                  Cancel
                </Button>
                <Button variant="default" onClick={handleArchiveButton}>
                  {!fieldValues.isArchived ? 'Yes, archive this link!' : 'Yes, restore this link!'}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
