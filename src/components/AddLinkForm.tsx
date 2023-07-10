import { Icons } from './Icons'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { InputGroup } from '@/components/ui/InputGroup'
import { Label } from '@/components/ui/Label'

export default function AddLinkForm({}) {
  return (
    <form action="" id="add-link-card" className="flex flex-col gap-4 border-border border-2 rounded-lg p-8">
      <InputGroup>
        <Label variant="sm" htmlFor="title">
          <Icons.title size={20} />
        </Label>
        <Input type="text" placeholder="Title" variant="sm" icon="sm" name="title" />
      </InputGroup>

      <InputGroup>
        <Label variant="sm" htmlFor="url">
          <Icons.link size={20} />
        </Label>
        <Input type="text" placeholder="URL" variant="sm" icon="sm" name="url" />
      </InputGroup>

      <Button variant="primary" size="sm">
        <Icons.add size={20} />
        Add link
      </Button>
    </form>
  )
}
