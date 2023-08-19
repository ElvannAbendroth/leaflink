import React, { FC } from 'react'
import Image from 'next/image'
import { Icons } from '@/components/Icons'
import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/lib/utils'

interface ProfilePictureProps {
  src?: string
  size?: number
  isLoading?: boolean
  className?: string
}

export const ProfilePicture: FC<ProfilePictureProps> = ({
  src = 'images/unknown-user.png',
  size = 120,
  isLoading = false,
  className,
  ...props
}) => {
  return !isLoading ? (
    <Image
      className={cn(`aspect-square object-cover rounded-full transition-all duration-500`, className)}
      src={src}
      alt="profile picture"
      width={size}
      height={size}
      quality={100}
      unoptimized
      priority={true}
      {...props}
    />
  ) : (
    <Skeleton className="h-[120px] w-[120px] bg-input rounded-full animate-pulse"></Skeleton>
  )
}

export const ProfilePictureEditable: FC<ProfilePictureProps> = ({ src, size = 120, isLoading }) => {
  return (
    <div className="rounded-full relative shadow-md ">
      <div className="absolute hover:bg-background/50 flex justify-center items-center w-full h-full opacity-0 hover:opacity-100 transition-all duration-500 aspect-square">
        <Icons.pen />
      </div>

      <ProfilePicture src={src} size={size} isLoading={isLoading} />
    </div>
  )
}
