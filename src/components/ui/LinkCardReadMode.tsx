'use client'
import { Icons } from '@/components/Icons'
import { Link } from '@/lib/types'
import { Switch } from '@/components/ui/Switch'
import { FC, MouseEventHandler, useState } from 'react'

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
        <p className="my-2 text-muted break-words pr-8">{href}</p>

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

export default LinkCardReadMode
