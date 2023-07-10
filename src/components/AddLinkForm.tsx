import { Icons } from './Icons'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function AddLinkForm({}) {
  return (
    <form action="" id="add-link-card" className="flex flex-col gap-4 border-border border-2 rounded-lg p-8">
      <div className="relative">
        <label className="absolute top-0 py-3 px-6 text-muted flex gap-2" htmlFor="title">
          <Icons.title size={20} />
        </label>
        <Input type="text" placeholder="Title" variant="sm" icon="sm" name="title" />
      </div>

      <div className="relative">
        <label className="absolute top-0 py-3 px-6 text-muted flex gap-2" htmlFor="url">
          <Icons.link size={20} />
        </label>
        <Input type="text" placeholder="URL" variant="sm" icon="sm" name="url" />
      </div>

      <Button variant="primary" size="sm">
        <Icons.add size={20} />
        Add link
      </Button>
    </form>
  )
}
