'use client'
import { ChangeEventHandler, FormEventHandler, useState, FC, useContext } from 'react'
import { Icons } from './Icons'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { InputGroup } from '@/components/ui/InputGroup'
import { Label } from '@/components/ui/Label'
import { Link } from '@/lib/types'
import { UserContext } from './UserProvider'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/Dialog'

interface AddLinkFormProps {}

export const AddLinkForm: FC<AddLinkFormProps> = () => {
  const { addLink } = useContext(UserContext)
  const [open, setOpen] = useState(false)
  const [fieldValues, setFieldValues] = useState<Link>({
    title: '',
    href: '',
    isActive: true,
  })

  const { title, href } = fieldValues

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target
    setFieldValues({ ...fieldValues, [name]: value })
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    addLink(fieldValues)
    setOpen(false)
    setFieldValues({ title: '', href: '', isActive: true })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="primary" size="sm">
          <Icons.add size={20} />
          Add link
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="typo-h2">Add a new link</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} id="add-link-card" className="flex flex-col gap-4">
          <InputGroup>
            <Label variant="sm" htmlFor="title">
              <Icons.title size={20} />
            </Label>
            <Input
              value={title}
              type="text"
              placeholder="Title"
              variant="sm"
              icon="sm"
              name="title"
              onChange={handleChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <Label variant="sm" htmlFor="href">
              <Icons.link size={20} />
            </Label>
            <Input
              type="url"
              placeholder="URL"
              variant="sm"
              icon="sm"
              name="href"
              value={href}
              onChange={handleChange}
              required
            />
          </InputGroup>

          <Button type="submit" variant="primary" size="sm">
            <Icons.add size={20} />
            Add link
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddLinkForm
