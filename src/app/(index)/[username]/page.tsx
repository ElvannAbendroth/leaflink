import { Icons } from '@/components/Icons'
import Image from 'next/image'
import Link from 'next/link'

interface UserLinksPageProps {
  params: {
    username: string
  }
}

export default function UserLinksPage({ params }: UserLinksPageProps) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col justify-center items-center">
        <Image
          className="rounded-full shadow-md"
          src="/images/profile-placeholder.png"
          alt="profile picture"
          width={120}
          height={120}
        />
        <p className="typo-p font-display font-semibold text-lg text">@{params.username}</p>
      </div>
      <Link
        className="flex justify-center items-center bg-input rounded-lg hover:scale-105 transition-all"
        href="http://www.elvannstore.com"
      >
        <p className="typo-h4 p-6"> My Store</p>
      </Link>
      <Link
        className="flex justify-center items-center bg-input rounded-lg hover:scale-105 transition-all"
        href="http://www.elvannstore.com"
      >
        <p className="typo-h4 p-6"> My Website</p>
      </Link>
      <Link
        className="flex justify-center items-center bg-input rounded-lg hover:scale-105 transition-all"
        href="http://www.elvannstore.com"
      >
        <p className="typo-h4 p-6">Latest Video</p>
      </Link>

      <div className="mt-8 flex gap-8 justify-center ">
        <Link className="text-muted hover:text-foreground transition-all" href="#">
          <Icons.gitHub size={28} />
        </Link>
        <Link className="text-muted hover:text-foreground transition-all" href="#">
          <Icons.twitter size={28} />
        </Link>
        <Link className="text-muted hover:text-foreground transition-all" href="#">
          <Icons.youtube size={28} />
        </Link>
      </div>
    </div>
  )
}
