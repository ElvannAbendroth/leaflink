'use client'
import { Icons } from '@/components/Icons'
import { Link } from '@/lib/types'
import { Switch } from '@/components/ui/Switch'
import { useState } from 'react'
import { InputGroup } from '@/components/ui/InputGroup'
import { Label } from '@/components/ui/Label'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface LinkCardEditProps {
  link: Link
}

export default function LinkCardEdit({ link }: LinkCardEditProps) {
  const { title, href, isActive } = link
  const [isEditMode, setIsEditMode] = useState(false)

  if (isEditMode)
    return (
      <form
        action=""
        id="add-link-card"
        className="flex flex-col gap-4 outline outline-border outline-2 outline-offset-2 rounded-lg p-8"
      >
        <p className="typo-h4 flex gap-4 items-center cursor-pointer justify-between">
          Edit link
          <Icons.close onClick={e => setIsEditMode(!isEditMode)} className="cursor-pointer" size={20} />
        </p>

        <InputGroup>
          <Label variant="sm" htmlFor="title">
            <Icons.title size={20} />
          </Label>
          <Input type="text" placeholder="Title" variant="sm" icon="sm" name="title" value={title} />
        </InputGroup>

        <InputGroup>
          <Label variant="sm" htmlFor="url">
            <Icons.link size={20} />
          </Label>
          <Input type="text" placeholder="URL" variant="sm" icon="sm" name="url" value={href} />
        </InputGroup>

        <Button onClick={e => setIsEditMode(!isEditMode)} variant="default" size="sm">
          <Icons.check size={20} />
          Save
        </Button>
        {/* <Button onClick={e => setIsEditMode(!isEditMode)} variant="danger" size="sm">
          <Icons.trash size={20} />
          Delete Link
        </Button> */}
      </form>
    )

  return (
    <div className="bg-input/60 shadow-lg shadow-muted/30 flex gap-4 rounded-lg p-8 items-start ">
      <div className="flex flex-col gap-4 flex-grow">
        <p className="typo-h4 flex gap-2 items-center cursor-pointer justify-between">
          {title}
          <Icons.pen onClick={e => setIsEditMode(!isEditMode)} className="cursor-pointer" size={20} />
        </p>

        <div className="flex justify-between items-end">
          <div className="flex flex-col gap-4">
            <p className="text-muted cursor-pointer">{href}</p>
            <Switch className="data-[state=unchecked]:bg-muted/20" checked={isActive} />
          </div>
          <Icons.trash className="cursor-pointer" size={20} />
        </div>
      </div>
      {/* <div className="flex flex-col h-full place-center items-center justify-center gap-3 content-center">
        <Icons.pen onClick={e => setIsEditMode(!isEditMode)} className="cursor-pointer" size={20} />
        <Icons.trash className="cursor-pointer" size={20} />
      </div> */}
    </div>
  )
}
