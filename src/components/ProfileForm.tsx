'use client'
import { ChangeEventHandler, FC, FormEventHandler, useContext, useEffect, useState } from 'react'
import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { InputGroup } from '@/components/ui/InputGroup'
import { Label } from '@/components/ui/Label'
import { Social } from '@/lib/types'
import { UserContext } from './UserProvider'

interface ProfileFormProps {
  // user: UserData | UserDocument
}

interface ProfileFormFields {
  name: string
  email: string
  username: string
  website: string
  imageUrl: string
  socials: Social
  password?: string
}

export const ProfileForm: FC<ProfileFormProps> = () => {
  const { user, updateUser, deleteUser } = useContext(UserContext)
  const [formValues, setFormValues] = useState<ProfileFormFields | null>(null)

  useEffect(() => {
    setFormValues(user as ProfileFormFields)
  }, [user])

  if (!user || !formValues) return null

  const { username, imageUrl, website, socials, name, email, password } = formValues

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleChangeSocials: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target
    setFormValues({ ...formValues, socials: { ...formValues.socials, [name]: value } })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    updateUser(formValues)
  }

  const handleDelete = (id: string) => {
    if (window.confirm('Do you really want to delete this account?')) {
      deleteUser(id)
    }
  }

  return (
    <div>
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
            type="url"
            placeholder="Insert your profile image URL"
            name="imageUrl"
            value={imageUrl || ''}
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
        <h2 className="typo-h2">Socials</h2>
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
        <h2 className="typo-h2">Account</h2>
        <InputGroup>
          <Label htmlFor="name">
            <Icons.user />
          </Label>
          <Input type="text" placeholder="enter your name" name="name" value={name || ''} onChange={handleChange} />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="email">
            <Icons.email />
          </Label>
          <Input type="email" placeholder="enter your email" name="email" value={email} onChange={handleChange} />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="email">
            <Icons.key />
          </Label>
          <Input
            type="password"
            placeholder="choose a new password"
            name="password"
            value={password}
            onChange={handleChange}
          />
        </InputGroup>
        <Button type="submit" className="mt-14">
          Save settings
        </Button>
      </form>
      <Button onClick={() => handleDelete(user.id)} variant="danger" className="mt-6">
        delete account
      </Button>
    </div>
  )
}
