'use client'
import { ChangeEventHandler, FC, FormEventHandler, useContext, useEffect, useState } from 'react'
import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { InputGroup } from '@/components/ui/InputGroup'
import { Label } from '@/components/ui/Label'
import { Social } from '@/lib/types'
import { UserContext } from './UserProvider'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog'

interface SocialsFormProps {
  // user: UserData | UserDocument
}

interface SocialsFormDialogFields {
  socials: Social
}

export const SocialsFormDialog: FC<SocialsFormProps> = () => {
  const { user, updateUser, deleteUser } = useContext(UserContext)
  const [formValues, setFormValues] = useState<SocialsFormDialogFields | null>(null)

  useEffect(() => {
    setFormValues(user as SocialsFormDialogFields)
  }, [user])

  if (!user || !formValues) return null

  const { socials } = formValues

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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          <Icons.pizza size={20} />
          Edit Social Links
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <h2 className="typo-h2 text-foreground">Edit Social Links</h2>
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
          <Button type="submit">Save settings</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
