'use client'
import { FC } from 'react'
import { Icons } from '@/components/Icons'
import Callout from '@/components/ui/Callout'

export const ThemeTab: FC = () => {
  return (
    <div className="">
      <h2 className="typo-h2">Theme</h2>
      <Callout type="warning">Feature currently in construction</Callout>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4"></div>
      </div>
    </div>
  )
}
