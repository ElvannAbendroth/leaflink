import { redirect } from 'next/navigation'
import { options } from '@/lib/auth'
import { getServerSession } from 'next-auth/next'
import Image from 'next/image'
import { buttonVariants } from '@/components/ui/Button'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export default async function Home() {
  const session = await getServerSession(options)

  if (session) {
    return redirect('/dashboard')
  }

  return (
    <div className="">
      <h1 className="typo-h1">Welcome to Leaflink!</h1>
      <Image
        className="rounded-lg shadow-md my-4"
        src="/images/hero-1.png"
        alt="Unknown User"
        width={1200}
        height={700}
        priority={true}
      />

      <p className="typo-p">
        Create your own page, manage your links, and share with the world in 1 convenient & personalized url!
      </p>

      <Link href="/register" className={cn(buttonVariants({ variant: 'default' }), 'my-4')}>
        Create your account!
      </Link>
      <Link href="/login" className={cn(buttonVariants({ variant: 'ghost' }), 'my-4')}>
        Log into your existing account!
      </Link>
    </div>
  )
}
