'use client'
import { ChangeEventHandler, FormEventHandler, useState, FC } from 'react'
import { Icons } from './Icons'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { InputGroup } from '@/components/ui/InputGroup'
import { Label } from '@/components/ui/Label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/Dialog'
import { PostLinkRequest } from '@/app/api/links/route'

interface AddLinkDialogProps {
  addLink: any
}

export const AddLinkDialog: FC<AddLinkDialogProps> = ({ addLink }) => {
  const [open, setOpen] = useState(false)
  const [fieldValues, setFieldValues] = useState<PostLinkRequest>({
    title: '',
    href: '',
    isActive: true,
    isArchived: false,
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
        <Button variant="primary">
          <Icons.add size={20} />
          Add link
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="typo-h3 text-left pl-2 text-foreground">Add a New Link</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} id="add-link-card" className="flex flex-col gap-4">
          <InputGroup>
            <Label htmlFor="title">
              <Icons.title size={20} />
            </Label>
            <Input value={title} type="text" placeholder="Title" name="title" onChange={handleChange} required />
          </InputGroup>

          <InputGroup>
            <Label htmlFor="href">
              <Icons.link size={20} />
            </Label>
            <Input type="url" placeholder="URL" name="href" value={href} onChange={handleChange} required />
          </InputGroup>

          <Button type="submit" variant="primary">
            <Icons.add size={20} />
            Add link
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddLinkDialog
