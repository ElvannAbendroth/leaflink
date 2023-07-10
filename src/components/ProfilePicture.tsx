import { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Icons } from '@/components/Icons'

interface ProfilePictureProps {
  src: string
  size?: number
}

export const ProfilePictureEditable: FC<ProfilePictureProps> = ({ src, size = 120 }) => {
  return (
    <div className="rounded-full relative shadow-md ">
      <div className="absolute hover:bg-background/50 flex justify-center items-center w-full h-full opacity-0 hover:opacity-100 transition-all duration-500">
        <Icons.pen />
      </div>

      <ProfilePicture src={src} size={size} />
    </div>
  )
}

export const ProfilePicture: FC<ProfilePictureProps> = ({ src, size = 120 }) => {
  return (
    <Image
      className="rounded-full transition-all duration-500"
      src={src}
      alt="profile picture"
      width={size}
      height={size}
    />
  )
}
