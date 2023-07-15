'use client'
import { Icons } from '@/components/Icons'
import { Link } from '@/lib/types'
import { Switch } from '@/components/ui/Switch'
import { FC, MouseEventHandler, useState } from 'react'
import { InputGroup } from '@/components/ui/InputGroup'
import { Label } from '@/components/ui/Label'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface LinkCardDashboardProps {
  link: Link
}

export default function LinkCardDashboard({ link }: LinkCardDashboardProps) {
  const [isEditMode, setIsEditMode] = useState(false)

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode)
  }

  if (isEditMode) return <LinkCardEditMode toggleEditMode={toggleEditMode} link={link} />

  return (
    <>
      {isEditMode ? (
        <LinkCardEditMode toggleEditMode={toggleEditMode} link={link} />
      ) : (
        <LinkCardReadMode toggleEditMode={toggleEditMode} link={link} />
      )}
    </>
  )
}

interface LinkCardReadModeProps {
  toggleEditMode: MouseEventHandler<HTMLButtonElement>
  link: Link
}

export const LinkCardReadMode: FC<LinkCardReadModeProps> = ({ toggleEditMode, link }) => {
  const { title, href, isActive } = link
  return (
    <div className="bg-input/60 shadow-lg shadow-muted/30 flex gap-4 rounded-lg p-8 items-start ">
      <div className="flex flex-col gap-4 flex-grow max-w-full">
        <p className="typo-h4 flex gap-2 items-center justify-between">
          {title}
          <button onClick={toggleEditMode}>
            <Icons.pen className="cursor-pointer" size={20} />
          </button>
        </p>
        <p className="typo-p text-muted break-words pr-8">{href}</p>

        <div className="flex flex-row justify-between items-end">
          <div className="flex flex-col gap-4">
            <Switch className="data-[state=unchecked]:bg-muted/20" checked={isActive} />
          </div>
          <Icons.trash className="cursor-pointer" size={20} />
        </div>
      </div>
    </div>
  )
}

interface LinkCardEditModeProps {
  toggleEditMode: MouseEventHandler<HTMLButtonElement>
  link: Link
}

const LinkCardEditMode: FC<LinkCardEditModeProps> = ({ toggleEditMode, link }) => {
  const { title, href } = link
  return (
    <form
      action=""
      id="add-link-card"
      className="flex flex-col gap-4 outline outline-border outline-2 outline-offset-2 rounded-lg p-8"
    >
      <p className="typo-h4 mb-4 flex gap-4 items-center cursor-pointer justify-between">
        Edit link
        <button onClick={toggleEditMode}>
          <Icons.close className="cursor-pointer" size={20} />
        </button>
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

      <Button type="submit" onClick={toggleEditMode} variant="default" size="sm">
        <Icons.check size={20} />
        Save
      </Button>
    </form>
  )
}
