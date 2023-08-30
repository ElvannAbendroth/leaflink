'use client'
import { FC } from 'react'
import { Icons } from '@/components/Icons'

export const ThemeTab: FC = () => {
  return (
    <div className="">
      <h2 className="typo-h2">Theme</h2>

      <p className="flex p-2 bg-warning-background rounded-md my-4 ">
        <strong className="typo-strong mr-1">Warning:</strong>Feature in construction
      </p>

      <p className="typo-p text-muted">Feature is still in construction</p>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4"></div>
      </div>
    </div>
  )
}
