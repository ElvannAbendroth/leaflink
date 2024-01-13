import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from './ui/Button'

export default function HeroSection() {
  return (
    <section className="relative w-full bg-[#000000] rounded-lg shadow-md hover:shadow-xl transition-all duration-500">
      <Image
        alt="SaaS company background"
        className="rounded-lg shadow-md absolute inset-0 object-cover w-full h-full opacity-30 hover:scale-105"
        height="800"
        src="/images/hero-1.png"
        style={{
          aspectRatio: '1920/800',
          objectFit: 'cover',
        }}
        width="1920"
      />
      <div className="container relative z-10  p-4 md:p-6">
        <div className="flex flex-col justify-center p-4 text-white">
          <h1 className="typo-title">Leaflink: An easy-to-use link in bio application</h1>
          <p className="mt-4 text-lg md:text-xl">
            Create your own page, manage your links, and share with the world in 1 convenient & personalized url!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div>
              {' '}
              <Link href="/register" className={cn(buttonVariants({ variant: 'subtle' }), 'my-4')}>
                Create your account!
              </Link>
              <Link href="/login" className={cn(buttonVariants({ variant: 'ghost' }), 'my-4 text-background')}>
                Log into your existing account!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
