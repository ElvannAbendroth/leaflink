'use client'
import { Icons } from '@/components/Icons'
import { Link } from '@/lib/types'
import { Switch } from '@/components/ui/Switch'
import { ChangeEventHandler, FormEventHandler, useState } from 'react'
import { InputGroup } from '@/components/ui/InputGroup'
import { Label } from '@/components/ui/Label'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface LinkCardDashboardProps {
  link: Link
  updateLink: (arg0: Link) => void
  removeLink: (arg0: Link) => void
}

export default function LinkCardDashboard({ link, updateLink, removeLink }: LinkCardDashboardProps) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [fieldValues, setFieldValues] = useState(link)
  const { title, href, isActive } = fieldValues

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode)
  }

  const handleSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    const updatedLink = { ...fieldValues, _id: link._id }
    updateLink(updatedLink)
    setIsEditMode(false)
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target
    setFieldValues({ ...fieldValues, [name]: value })
  }

  const handleToggle: any = (checked: boolean) => {
    const newActiveState = !fieldValues.isActive
    setFieldValues({ ...fieldValues, isActive: newActiveState })
    link.isActive = newActiveState
    updateLink(link)
  }

  const handleDeleteButton = () => {
    console.log('exterminate!', link._id)
    removeLink(link)
  }

  return (
    <>
      {isEditMode ? (
        <form
          onSubmit={handleSubmit}
          action=""
          id="add-link-card"
          className="flex flex-col gap-4 outline outline-border outline-2 outline-offset-2 rounded-lg p-8"
        >
          {/* <p className="typo-h4 mb-4 flex gap-4 items-center cursor-pointer justify-between">
            Edit link
            <button onClick={toggleEditMode}>
              <Icons.close className="cursor-pointer" size={20} />
            </button>
          </p> */}

          <InputGroup>
            <Label variant="sm" htmlFor="title">
              <Icons.title size={20} />
            </Label>
            <Input
              name="title"
              value={title}
              onChange={handleChange}
              type="text"
              placeholder="Title"
              variant="sm"
              icon="sm"
            />
          </InputGroup>

          <InputGroup>
            <Label variant="sm" htmlFor="url">
              <Icons.link size={20} />
            </Label>
            <Input
              name="href"
              value={href}
              onChange={handleChange}
              type="text"
              placeholder="URL"
              variant="sm"
              icon="sm"
            />
          </InputGroup>

          <Button type="submit" variant="default" size="sm">
            <Icons.check size={20} />
            Save
          </Button>
        </form>
      ) : (
        <div className="bg-input/60 shadow-lg shadow-muted/30 flex gap-4 rounded-lg p-8 items-start ">
          <div className="flex flex-col gap-4 flex-grow max-w-full">
            <p className="typo-h4 flex gap-2 items-center justify-between">
              {title}
              <button onClick={toggleEditMode}>
                <Icons.pen className="cursor-pointer" size={20} />
              </button>
            </p>
            <p className="typo-p text-muted break-words pr-8">{href}</p>

            <div className="flex flex-row justify-between items-end">
              <div className="flex flex-col gap-4">
                <Switch
                  className="data-[state=unchecked]:bg-muted/20"
                  value="on"
                  name="isActive"
                  // checked={isActive}
                  checked={isActive}
                  onCheckedChange={checked => handleToggle(checked)}
                />
              </div>
              <Icons.trash onClick={handleDeleteButton} className="cursor-pointer" size={20} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// 'use client'
// import { Link } from '@/lib/types'
// import LinkCardEditMode from '@/components/LinkCardEditMode'
// import LinkCardReadMode from './ui/LinkCardReadMode'
// import { useState } from 'react'

// interface LinkCardDashboardProps {
//   link: Link
// }

// export default function LinkCardDashboard({ link }: LinkCardDashboardProps) {
//   const [isEditMode, setIsEditMode] = useState(false)

//   const toggleEditMode = () => {
//     setIsEditMode(!isEditMode)
//   }

//   return (
//     <>
//       {isEditMode ? (
//         <LinkCardEditMode toggleEditMode={toggleEditMode} link={link} />
//       ) : (
//         <LinkCardReadMode toggleEditMode={toggleEditMode} link={link} />
//       )}
//     </>
//   )
// }
