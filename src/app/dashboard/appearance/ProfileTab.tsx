'use client'
import { FC } from 'react'
import { Icons } from '@/components/Icons'
import { ProfilePicture } from '@/components/ProfilePicture'
import { Input } from '@/components/ui/Input'
import { InputGroup } from '@/components/ui/InputGroup'
import { Label } from '@/components/ui/Label'
import { ChangeEventHandler } from 'react'
import { Textarea } from '@/components/ui/Textarea'

import { ProfileFormFields } from './page'

interface ProfileTabProps {
  formValues: ProfileFormFields
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
}

export const ProfileTab: FC<ProfileTabProps> = ({ formValues, handleChange }) => {
  const { username, description, imageUrl, website } = formValues
  return (
    <div className="">
      <h2 className="typo-h2">Profile</h2>

      <p className="typo-p text-muted">Edit your public url, profile picture & bio</p>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <ProfilePicture src={formValues.imageUrl} className="h-32 w-32 self-center" />
          <div className="flex flex-col gap-4 grow">
            <InputGroup>
              <Label htmlFor="username">
                <Icons.logo /> leaf.link/
              </Label>
              <Input
                className="pl-28 ml-2"
                type="text"
                placeholder="username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup className="grow">
              <Label htmlFor="imageUrl">
                <Icons.media />
              </Label>
              <Input
                type="url"
                placeholder="Insert your profile image URL"
                name="imageUrl"
                value={imageUrl || ''}
                onChange={handleChange}
              />
            </InputGroup>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <InputGroup>
            <Label htmlFor="description">
              <Icons.title />
            </Label>
            <Textarea
              placeholder="Write something about you!"
              name="description"
              value={description || ''}
              onChange={handleChange}
            />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="website">
              <Icons.link />
            </Label>
            <Input
              type="url"
              placeholder="Insert URL for your profile username & image"
              name="website"
              value={website || ''}
              onChange={handleChange}
            />
          </InputGroup>
        </div>
      </div>
    </div>
  )
}
