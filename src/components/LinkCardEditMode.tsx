'use client'
import { Icons } from '@/components/Icons'
import { Link } from '@/lib/types'
import { Switch } from '@/components/ui/Switch'
import { FC, MouseEventHandler, useState } from 'react'
import { InputGroup } from '@/components/ui/InputGroup'
import { Label } from '@/components/ui/Label'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { linkTitlePattern, linkUrlPattern } from '@/lib/validation'

interface LinkCardEditModeProps {
  toggleEditMode: MouseEventHandler<HTMLButtonElement>
  link: Link
}

export const LinkCardEditMode: FC<LinkCardEditModeProps> = ({ toggleEditMode, link }) => {
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
        <Input
          type="text"
          placeholder="Title"
          variant="sm"
          icon="sm"
          name="title"
          value={title}
          required
          pattern={linkTitlePattern}
        />
      </InputGroup>

      <InputGroup>
        <Label variant="sm" htmlFor="url">
          <Icons.link size={20} />
        </Label>
        <Input
          type="text"
          placeholder="URL"
          variant="sm"
          icon="sm"
          name="url"
          value={href}
          required
          pattern={linkUrlPattern}
        />
      </InputGroup>

      <Button type="submit" onClick={toggleEditMode} variant="default" size="sm">
        <Icons.check size={20} />
        Save
      </Button>
    </form>
  )
}

export default LinkCardEditMode
