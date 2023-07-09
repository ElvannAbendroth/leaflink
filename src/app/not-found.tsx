import { Icons } from '@/components/Icons'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="text-center">
      <h1 className="typo-h1">Not Found</h1>
      <p className="typo-p">Could not find requested resource</p>
      <p className="typo-p">
        {' '}
        <Link className="typo-a flex gap-2 place-items-center justify-center" href="/">
          <Icons.chevronLeft size={16} /> <span> return to homepage</span>
        </Link>
      </p>
    </div>
  )
}
