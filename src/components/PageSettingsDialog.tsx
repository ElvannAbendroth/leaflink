'use client'
import { ChangeEventHandler, FC, FormEventHandler, useContext, useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog'
import { ProfilePictureEditable } from '@/components/ProfilePicture'
import { User, UserData } from '@/lib/types'
import { InputGroup } from '@/components/ui/InputGroup'
import { Label } from '@/components/ui/Label'
import { UserContext } from './UserProvider'
import { Icons } from './Icons'
import { Input } from './ui/Input'
import { Textarea } from './ui/Textarea'
import { Button } from './ui/Button'

interface PageSettingsDialogProps {
  user: UserData | null
  isLoading?: boolean
}
interface ProfileFormFields {
  username: string
  description: string
  website: string
  imageUrl: string
}

export const PageSettingsDialog: FC<PageSettingsDialogProps> = ({ user, isLoading }) => {
  const { updateUser } = useContext(UserContext)
  const [formValues, setFormValues] = useState<ProfileFormFields | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setFormValues(user as ProfileFormFields)
  }, [user])

  if (!user || !formValues) return null

  const { username, description, imageUrl, website } = formValues

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = ({ target }) => {
    const { name, value } = target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    updateUser(formValues)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          <Icons.settings size={20} />
          Page Settings
        </Button>
      </DialogTrigger>

      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>
            <h2 className="typo-h2 text-foreground">Page Settings</h2>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className=" flex flex-col gap-6">
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

          <Button type="submit" className="">
            Save settings
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
