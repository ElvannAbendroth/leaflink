/* eslint-disable react/no-unescaped-entities */
import { Icons } from '@/components/Icons'
import Link from 'next/link'
import { UserLinksPageProps } from './page'
import Image from 'next/image'

export default function NotFound({ params }: UserLinksPageProps) {
  return (
    <div className="text-center flex flex-col justify-center items-center gap-6">
      <a>
        <Image
          className="rounded-full shadow-md"
          src="/images/unknown-user.png"
          alt="Unknown User"
          width={120}
          height={120}
        />
      </a>
      <div>
        <h1 className="typo-h1">This User Doesn't Exist yet!</h1>
        <p className="typo-p">Create an account to reserve this username & URL!</p>
        <p className="typo-p">
          {' '}
          <Link className="typo-a flex gap-2 place-items-center justify-center" href="/">
            <Icons.chevronLeft size={16} /> <span> return to homepage</span>
          </Link>
        </p>
      </div>
    </div>
  )
}
