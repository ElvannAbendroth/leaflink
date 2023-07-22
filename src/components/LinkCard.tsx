'use client'
import { Icons } from '@/components/Icons'
import { Link as LinkType } from '@/lib/types'
import { Switch } from '@/components/ui/Switch'
import { ChangeEventHandler, FormEventHandler, useContext, useState } from 'react'
import { InputGroup } from '@/components/ui/InputGroup'
import { Label } from '@/components/ui/Label'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { UserContext } from './UserProvider'
import Link from 'next/link'

interface LinkCardProps {
  link: LinkType
  isPublic?: boolean
}

export default function LinkCard({ link, isPublic = false }: LinkCardProps) {
  const { removeLink, updateLink } = useContext(UserContext)
  const [isEditMode, setIsEditMode] = useState<boolean>(false)
  const [fieldValues, setFieldValues] = useState<LinkType>(link)
  const { title, href, isActive } = fieldValues

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode)
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    const updatedLink = { ...fieldValues, _id: link._id }
    updateLink(updatedLink)
    setIsEditMode(false)
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target
    setFieldValues({ ...fieldValues, [name]: value })
  }

  const handleToggle: any = (checked: boolean) => {
    const updatedLink = { ...fieldValues, isActive: !fieldValues.isActive }
    setFieldValues(updatedLink)
    updateLink(updatedLink)
  }

  const handleDeleteButton = () => {
    removeLink(link)
  }

  if (isPublic)
    return (
      <a
        target="_blank"
        className="flex justify-center items-center bg-input rounded-lg hover:scale-105 transition-all"
        href={href}
      >
        <p className="typo-h4 p-6">{title}</p>
      </a>
    )

  return (
    <>
      {isEditMode ? (
        <form
          onSubmit={handleSubmit}
          action=""
          id="add-link-card"
          className="flex flex-col gap-4 outline outline-border outline-2 outline-offset-2 rounded-lg p-8"
        >
          <InputGroup>
            <Label variant="sm" htmlFor="title">
              <Icons.title size={20} />
            </Label>
            <Input
              name="title"
              value={title}
              onChange={handleChange}
              type="text"
              placeholder="Title"
              variant="sm"
              icon="sm"
            />
          </InputGroup>

          <InputGroup>
            <Label variant="sm" htmlFor="url">
              <Icons.link size={20} />
            </Label>
            <Input
              name="href"
              value={href}
              onChange={handleChange}
              type="text"
              placeholder="URL"
              variant="sm"
              icon="sm"
            />
          </InputGroup>

          <Button type="submit" variant="default" size="sm">
            <Icons.check size={20} />
            Save
          </Button>
        </form>
      ) : (
        <div className="bg-input/60 shadow-lg shadow-muted/30 flex gap-4 rounded-lg p-8 items-start ">
          <div className="flex flex-col gap-4 flex-grow max-w-full">
            <div className="flex gap-2 items-center justify-between">
              <div className="flex gap-2 items-center typo-h4">
                <Icons.title size={18} strokeWidth={3} />
                {title}
              </div>
              <button onClick={toggleEditMode}>
                <Icons.pen className="cursor-pointer text-muted hover:text-foreground transition-all" size={20} />
              </button>
            </div>
            <a
              href={href}
              target="_blank"
              className="flex gap-2 items-center text-muted break-words pr-8 mb-1 hover:text-foreground/70 transition-all"
            >
              <Icons.link size={18} />
              <span>{href}</span>
            </a>

            <div className="flex flex-row justify-between items-end">
              <div className="flex flex-col gap-4">
                <Switch
                  className="data-[state=unchecked]:bg-muted/20"
                  value="on"
                  name="isActive"
                  checked={isActive}
                  onCheckedChange={checked => handleToggle(checked)}
                />
              </div>
              <Icons.trash
                onClick={handleDeleteButton}
                className="cursor-pointer text-muted hover:text-danger transition-all"
                size={20}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
