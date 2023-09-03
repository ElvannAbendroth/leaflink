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

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg theme-light ">
          <div className="w-full h-full p-3 bg-background text-foreground rounded-lg border-border border-2">
            <h2 className="typo-h5">Light Theme</h2>
            <div className="mt-3 mx-auto flex items-center justify-center aspect-square h-12 bg-input rounded-full text-xs">
              P
            </div>
            <p className=" mt-3 text-muted italic text-[12px] text-center">something about you...</p>
            <div className="mt-3 w-full h-6 bg-input rounded-lg"></div>
            <div className="mt-3 w-full h-6 bg-input rounded-lg"></div>
            <div className="mt-3 w-full h-6 bg-input rounded-lg"></div>
            <div className=" mt-3 flex gap-2 justify-center">
              <div className="flex items-center aspect-square h-3 bg-input rounded-full"></div>
              <div className="flex items-center aspect-square h-3 bg-input rounded-full"></div>
              <div className="flex items-center aspect-square h-3 bg-input rounded-full"></div>
            </div>
          </div>
        </div>
        <div className=" rounded-lg theme-dark">
          <div className="w-full h-full p-3 bg-background text-foreground rounded-lg">
            <h2 className="typo-h5">Dark Theme</h2>
            <div className="mt-3 mx-auto flex items-center justify-center aspect-square h-12 bg-input rounded-full text-xs">
              P
            </div>
            <p className=" mt-3 text-muted italic text-[12px] text-center">something about you...</p>
            <div className="mt-3 w-full h-6 bg-input rounded-lg"></div>
            <div className="mt-3 w-full h-6 bg-input rounded-lg"></div>
            <div className="mt-3 w-full h-6 bg-input rounded-lg"></div>
            <div className=" mt-3 flex gap-2 justify-center">
              <div className="flex items-center aspect-square h-3 bg-input rounded-full"></div>
              <div className="flex items-center aspect-square h-3 bg-input rounded-full"></div>
              <div className="flex items-center aspect-square h-3 bg-input rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="rounded-lg theme-green ">
          <div className="w-full h-full p-3 bg-background text-foreground rounded-lg border-border border-2">
            <h2 className="typo-h5">Green Theme</h2>
            <div className="mt-3 mx-auto flex items-center justify-center aspect-square h-12 bg-input rounded-full text-xs">
              P
            </div>
            <p className=" mt-3 text-muted italic text-[12px] text-center">something about you...</p>
            <div className="mt-3 w-full h-6 bg-input rounded-lg"></div>
            <div className="mt-3 w-full h-6 bg-input rounded-lg"></div>
            <div className="mt-3 w-full h-6 bg-input rounded-lg"></div>
            <div className=" mt-3 flex gap-2 justify-center">
              <div className="flex items-center aspect-square h-3 bg-input rounded-full"></div>
              <div className="flex items-center aspect-square h-3 bg-input rounded-full"></div>
              <div className="flex items-center aspect-square h-3 bg-input rounded-full"></div>
            </div>
          </div>
        </div>
        <div className=" rounded-lg theme-pink ">
          <div className="w-full h-full p-3 bg-background text-foreground rounded-lg border-border border-2">
            <h2 className="typo-h5">Pink Theme</h2>
            <div className="mt-3 mx-auto flex items-center justify-center aspect-square h-12 bg-input rounded-full text-xs">
              P
            </div>
            <p className=" mt-3 text-muted italic text-[12px] text-center">something about you...</p>
            <div className="mt-3 w-full h-6 bg-input rounded-lg"></div>
            <div className="mt-3 w-full h-6 bg-input rounded-lg"></div>
            <div className="mt-3 w-full h-6 bg-input rounded-lg"></div>
            <div className=" mt-3 flex gap-2 justify-center">
              <div className="flex items-center aspect-square h-3 bg-input rounded-full"></div>
              <div className="flex items-center aspect-square h-3 bg-input rounded-full"></div>
              <div className="flex items-center aspect-square h-3 bg-input rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
