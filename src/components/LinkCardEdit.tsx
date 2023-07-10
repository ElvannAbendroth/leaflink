import { Icons } from '@/components/Icons'
import { Link } from '@/lib/types'

interface LinkCardEditProps {
  link: Link
}

export default function LinkCardEdit({ link }: LinkCardEditProps) {
  const { title, href } = link
  return (
    <div className="bg-input flex gap-4 rounded-lg p-8 items-end ">
      <div className="flex flex-col gap-4 flex-grow">
        <p className="typo-h4 flex gap-2 items-center cursor-pointer">
          {title}
          <Icons.pen size={16} />
        </p>
        <p className="text-muted flex gap-2 items-center cursor-pointer">
          {href}
          <Icons.pen size={16} />
        </p>
      </div>
      <Icons.trash className="cursor-pointer" size={16} />
    </div>
  )
}
