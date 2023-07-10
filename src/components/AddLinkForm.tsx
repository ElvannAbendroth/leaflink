import { Icons } from './Icons'
import { Button } from '@/components/ui/Button'

export default function AddLinkForm({}) {
  return (
    <form action="" id="add-link-card" className="flex flex-col gap-4 border-border border-2 rounded-lg p-8">
      <input
        className="bg-input flex gap-3 rounded-full  py-3 px-6 items-center justify-center self-stretch placeholder:text-muted w-full focus-visible:outline-primary"
        type="text"
        placeholder="Title"
      />
      <input
        className="bg-input flex gap-3 rounded-full  py-3 px-6 items-center justify-center self-stretch placeholder:text-muted w-full focus-visible:outline-primary"
        type="text"
        placeholder="URL"
      />
      <Button variant="primary" size="sm">
        <Icons.add size={20} />
        Add link
      </Button>
    </form>
  )
}
