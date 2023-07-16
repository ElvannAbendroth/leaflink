'use client'
import { ChangeEventHandler, FormEventHandler, useState, FC } from 'react'
import { Icons } from './Icons'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { InputGroup } from '@/components/ui/InputGroup'
import { Label } from '@/components/ui/Label'
import { Link } from '@/lib/types'

interface AddLinkFormProps {
  addLink: Function
}

export const AddLinkForm: FC<AddLinkFormProps> = ({ addLink }) => {
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
  }

  return (
    <form
      onSubmit={handleSubmit}
      id="add-link-card"
      className="flex flex-col gap-4 outline outline-border outline-2 rounded-lg p-8"
    >
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
        />
      </InputGroup>

      <InputGroup>
        <Label variant="sm" htmlFor="href">
          <Icons.link size={20} />
        </Label>
        <Input type="text" placeholder="URL" variant="sm" icon="sm" name="href" value={href} onChange={handleChange} />
      </InputGroup>

      <Button type="submit" variant="primary" size="sm">
        <Icons.add size={20} />
        Add link
      </Button>
    </form>
  )
}

export default AddLinkForm
