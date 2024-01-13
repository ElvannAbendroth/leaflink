import { redirect } from 'next/navigation'
import { options } from '@/lib/auth'
import { getServerSession } from 'next-auth/next'
import Image from 'next/image'
import { buttonVariants } from '@/components/ui/Button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import HeroSection from '@/components/HeroSection'
import FeatureSection from '@/components/FeatureSection'

export default async function Home() {
  const session = await getServerSession(options)

  if (session) {
    return redirect('/dashboard')
  }

  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <FeatureSection />
    </div>
  )
}
