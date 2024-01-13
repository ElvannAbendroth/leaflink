'use client'
import { ChangeEventHandler, FC, FormEventHandler, useContext, useEffect, useState } from 'react'
import { Icons } from '@/components/Icons'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { InputGroup } from '@/components/ui/InputGroup'
import { Label } from '@/components/ui/Label'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog'
import { UserContext } from '@/components/UserProvider'

interface AccountPageProps {}

interface ProfileFormFields {
  name: string
  email: string
  password?: string
}

export default function AccountPage({}) {
  const { user, updateUser, deleteUser } = useContext(UserContext)
  const [formValues, setFormValues] = useState<ProfileFormFields | null>(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setFormValues(user as ProfileFormFields)
  }, [user])

  if (!user || !formValues) return null

  const { name, email, password } = formValues

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
    <div className="">
      <h2 className="typo-h2">My Account</h2>

      <div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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
          <Button type="submit" className="">
            Save settings
          </Button>
        </form>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="danger" className="mt-3 w-full">
              Delete account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="typo-h2">Are you sure sure you want to delete your account?</DialogTitle>
              <DialogDescription>
                <p className="typo-p">
                  This action cannot be undone. This will permanently delete your account and remove your data from our
                  servers.
                </p>
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-4 justify-end">
              <Button
                onClick={e => {
                  e.preventDefault()
                  setOpen(false)
                }}
                variant="default"
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
    </div>
  )
}
