import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { UserDocument } from './types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const makeSafe = (user: UserDocument) => {
  const safeUser = {
    ...user.toObject(),
    id: user._id.toString(),
  }

  // Delete Unwanted fields
  delete safeUser.password
  delete safeUser._id
  delete safeUser.__v

  return safeUser
}
