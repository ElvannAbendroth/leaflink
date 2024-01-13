'use client'
import { FC } from 'react'
import { Icons } from '@/components/Icons'
import { ProfilePicture } from '@/components/ProfilePicture'
import { UserContext } from '@/components/UserProvider'
import { Input } from '@/components/ui/Input'
import { InputGroup } from '@/components/ui/InputGroup'
import { Label } from '@/components/ui/Label'
import { ChangeEventHandler, useCallback, useContext, useEffect, useState } from 'react'
import debounce from 'lodash.debounce'
import { Textarea } from '@/components/ui/Textarea'
import { request } from 'http'
import { useDebounce } from '@/lib/hooks/useDebounce'
import { useSearchParams } from 'next/navigation'
import { ProfileFormFields } from './page'
import { Social } from '@/lib/types'

interface SocialTabProps {
  socials: Social
  handleChangeSocials: ChangeEventHandler<HTMLInputElement>
}

export const SocialTab: FC<SocialTabProps> = ({ socials, handleChangeSocials }) => {
  return (
    <div className="">
      <h2 className="typo-h2">Socials</h2>

      <p className="typo-p text-muted">
        Add Social Icons to your page. They will appear as icons at the bottom of your public page.
      </p>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <InputGroup>
            <Label htmlFor="instagram">
              <Icons.instagram />
            </Label>
            <Input
              type="url"
              placeholder="Insert your Instagram Link"
              name="instagram"
              onChange={handleChangeSocials}
              value={socials?.instagram}
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="facebook">
              <Icons.facebook />
            </Label>
            <Input
              type="url"
              placeholder="Insert your Facebook Link"
              name="facebook"
              onChange={handleChangeSocials}
              value={socials?.facebook}
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="youtube">
              <Icons.youtube />
            </Label>
            <Input
              type="url"
              placeholder="Insert your YouTube Link"
              name="youtube"
              onChange={handleChangeSocials}
              value={socials?.youtube}
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="twitter">
              <Icons.twitter />
            </Label>
            <Input
              type="url"
              placeholder="Insert your Twitter Link"
              name="twitter"
              onChange={handleChangeSocials}
              value={socials?.twitter}
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="gitHub">
              <Icons.gitHub />
            </Label>
            <Input
              type="url"
              placeholder="Insert your Github Link"
              name="github"
              onChange={handleChangeSocials}
              value={socials?.github}
            />
          </InputGroup>
          <InputGroup>
            <Label htmlFor="website">
              <Icons.link />
            </Label>
            <Input
              type="url"
              placeholder="Insert your Website Link"
              name="website"
              onChange={handleChangeSocials}
              value={socials?.website}
            />
          </InputGroup>
        </div>
      </div>
    </div>
  )
}
