'use client'
import { ChangeEventHandler, FC, FormEventHandler, useState } from 'react'
import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { InputGroup } from '@/components/ui/InputGroup'
import { Label } from '@/components/ui/Label'
import { Social, UserData, UserDocument } from '@/lib/types'
import { useSession } from 'next-auth/react'
import { CustomSession } from '@/lib/auth'
import { useRouter } from 'next/navigation'

interface ProfileFormProps {
  user: UserData | UserDocument
}

interface ProfileFormFields {
  username: string
  website: string
  imageUrl: string
  socials: Social
}

export const ProfileForm: FC<ProfileFormProps> = ({ user }) => {
  const router = useRouter()
  const [formValues, setFormValue] = useState<ProfileFormFields>({
    username: user.username,
    website: user.website ? user.website : '',
    imageUrl: user.imageUrl ? user.imageUrl : '',
    socials: user.socials,
  })
  const session = useSession()?.data as CustomSession

  const { username, imageUrl, website, socials } = formValues

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target
    setFormValue({ ...formValues, [name]: value })
  }

  const handleChangeSocials: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target
    setFormValue({ ...formValues, socials: { ...formValues.socials, [name]: value } })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    await updateUser()
    router.refresh()
  }

  const updateUser = async () => {
    const payload = { ...formValues }

    const res = await fetch(`/api/users/${session.user.id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    })

    if (!res?.ok) throw new Error('There was an error updating this link!')
  }

  return (
    <form onSubmit={handleSubmit} className="mt-14 flex flex-col gap-6">
      <div>
        <h2 className="typo-h2">User</h2>
      </div>

      <InputGroup>
        <Label htmlFor="username">
          <Icons.logo /> leaf.link/
        </Label>
        <Input
          className="pl-32"
          type="text"
          placeholder="username"
          name="username"
          value={username}
          onChange={handleChange}
        />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="imageUrl">
          <Icons.media />
        </Label>
        <Input
          type="text"
          placeholder="Insert your profile image URL"
          name="imageUrl"
          value={imageUrl}
          onChange={handleChange}
        />
      </InputGroup>

      <InputGroup>
        <Label htmlFor="website">
          <Icons.link />
        </Label>
        <Input
          type="text"
          placeholder="Insert URL for your profile username & image"
          name="website"
          value={website}
          onChange={handleChange}
        />
      </InputGroup>

      <h2 className="typo-h2">Socials</h2>

      <InputGroup>
        <Label htmlFor="instagram">
          <Icons.instagram />
        </Label>
        <Input
          type="text"
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
          type="text"
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
          type="text"
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
          type="text"
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
          type="text"
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
          type="text"
          placeholder="Insert your Website Link"
          name="website"
          onChange={handleChangeSocials}
          value={socials?.website}
        />
      </InputGroup>
      <Button type="submit" className="mt-14">
        Save settings
      </Button>
    </form>
  )
}
