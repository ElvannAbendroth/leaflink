import * as React from 'react'
import Image from 'next/image'
import { Icons } from '@/components/Icons'

interface ProfilePictureProps {
  src?: string
  size?: number
}

export const ProfilePicture: React.FC<ProfilePictureProps> = ({
  src = 'images/unknown-user.png',
  size = 120,
  ...props
}) => {
  return (
    <Image
      className="aspect-square object-cover rounded-full transition-all duration-500"
      src={src}
      alt="profile picture"
      width={size}
      height={size}
      quality={100}
      unoptimized
      {...props}
    />
  )
}

export const ProfilePictureEditable: React.FC<ProfilePictureProps> = ({ src, size = 120 }) => {
  return (
    <div className="rounded-full relative shadow-md ">
      <div className="absolute hover:bg-background/50 flex justify-center items-center w-full h-full opacity-0 hover:opacity-100 transition-all duration-500 aspect-square">
        <Icons.pen />
      </div>

      <ProfilePicture src={src} size={size} />
    </div>
  )
}
