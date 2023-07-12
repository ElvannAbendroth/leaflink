import { FC } from 'react'
import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { InputGroup } from '@/components/ui/InputGroup'
import { Label } from '@/components/ui/Label'

import { loggedUser, users } from '@/lib/data'
import { redirect } from 'next/navigation'

interface ProfileFormProps {}

export const ProfileForm: FC<ProfileFormProps> = () => {
  const userData = users.find(user => user.id === loggedUser.id)

  if (!userData) {
    return redirect('/login')
  }

  const { username, imageUrl, socials, website } = userData

  return (
    <form action="/dashboard" className="mt-14 flex flex-col gap-6">
      <div>
        <h2 className="typo-h2">User</h2>
      </div>

      <InputGroup>
        <Label htmlFor="username">
          <Icons.logo /> leaf.link/
        </Label>
        <Input className="pl-32" type="text" name="username" placeholder="username" value={username.toLowerCase()} />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="profile-image">
          <Icons.media />
        </Label>
        <Input type="text" placeholder="Insert your profile image URL" name="profile-image" value={imageUrl} />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="profile-image">
          <Icons.link />
        </Label>
        <Input
          type="text"
          placeholder="Insert URL for your profile username & image"
          name="profile-image"
          value={website}
        />
      </InputGroup>

      <h2 className="typo-h2">Socials</h2>

      <InputGroup>
        <Label htmlFor="instagram">
          <Icons.instagram />
        </Label>
        <Input type="text" placeholder="Insert your Instagram Link" name="instagram" value={socials?.instagram} />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="facebook">
          <Icons.facebook />
        </Label>
        <Input type="text" placeholder="Insert your Facebook Link" name="facebook" value={socials?.facebook} />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="youtube">
          <Icons.youtube />
        </Label>
        <Input type="text" placeholder="Insert your YouTube Link" name="youtube" value={socials?.youtube} />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="twitter">
          <Icons.twitter />
        </Label>
        <Input type="text" placeholder="Insert your Twitter Link" name="twitter" value={socials?.twitter} />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="gitHub">
          <Icons.gitHub />
        </Label>
        <Input type="text" placeholder="Insert your Github Link" name="gitHub" value={socials?.github} />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="instagram">
          <Icons.link />
        </Label>
        <Input type="text" placeholder="Insert your Website Link" name="instagram" value={socials?.website} />
      </InputGroup>
      <Button className="mt-14">Save settings</Button>
    </form>
  )
}
