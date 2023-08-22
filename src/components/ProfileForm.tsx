'use client'
import { ChangeEventHandler, FC, FormEventHandler, useContext, useEffect, useState } from 'react'
import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { InputGroup } from '@/components/ui/InputGroup'
import { Label } from '@/components/ui/Label'
import { Social } from '@/lib/types'
import { UserContext } from './UserProvider'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog'
import { redirect } from 'next/navigation'

interface ProfileFormProps {
  // user: UserData | UserDocument
}

interface ProfileFormFields {
  name: string
  email: string
  socials: Social
  password?: string
}

export const ProfileForm: FC<ProfileFormProps> = () => {
  const { user, updateUser, deleteUser } = useContext(UserContext)
  const [formValues, setFormValues] = useState<ProfileFormFields | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setFormValues(user as ProfileFormFields)
  }, [user])

  if (!user || !formValues) return null

  const { socials, name, email, password } = formValues

  const handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = ({ target }) => {
    const { name, value } = target
    setFormValues({ ...formValues, [name]: value })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    updateUser(formValues)
  }

  const handleDelete = (id: string) => {
    deleteUser(id)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-14 flex flex-col gap-6">
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="danger" className="mt-6">
            Delete account
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="typo-h2">Are you sure absolutely sure?</DialogTitle>
            <DialogDescription>
              <p className="typo-p">
                This action cannot be undone. This will permanently delete your account and remove your data from our
                servers.
              </p>
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-4">
            <Button
              onClick={e => {
                e.preventDefault()
                setOpen(false)
              }}
              variant="default"
              className=""
            >
              Cancel
            </Button>
            <Button onClick={() => handleDelete(user.id)} variant="danger" className="">
              Delete account
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
