'use client'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/Button'
import { Icons } from '@/components/Icons'
import { AnimatePresence, motion } from 'framer-motion'
import animations from '@/lib/animations'

export default function HeroSection() {
  return (
    <motion.section
      variants={animations.heroSection.parent}
      initial="hidden"
      animate="visible"
      className="relative w-full bg-[#000000] rounded-lg shadow-md hover:shadow-xl transition-all duration-500 max-w-layout mx-auto"
    >
      <Image
        alt="SaaS company background"
        className="rounded-lg shadow-md absolute inset-0 object-cover w-full h-full opacity-30 "
        height="800"
        src="/images/hero-1.png"
        style={{
          aspectRatio: '1920/800',
          objectFit: 'cover',
        }}
        width="1920"
      />

      <div className=" flex flex-col items-center justify-center relative z-10  p-4 md:p-6">
        <div className="flex flex-col items-center justify-center p-4 text-white text-center">
          <motion.h1 variants={animations.heroSection.child} className="typo-title">
            Leaflink: An easy-to-use link in bio application
          </motion.h1>
          <motion.p variants={animations.heroSection.child} className="mt-4 text-lg md:text-xl max-w-optical">
            Create your own page, manage your links, and share with the world in 1 convenient & personalized url!
          </motion.p>
          <div className="flex flex-col gap-4 mt-6 items-center">
            <motion.div variants={animations.heroSection.child} className="max-w-sm">
              <Link href="/register" className={cn(buttonVariants({ variant: 'primary' }), 'relative my-4')}>
                <Icons.sparkles />
                Create your Leaflink Page!
              </Link>
              <Link href="/login" className={cn(buttonVariants({ variant: 'link' }), 'my-4 text-background ')}>
                Log into your existing account!
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
