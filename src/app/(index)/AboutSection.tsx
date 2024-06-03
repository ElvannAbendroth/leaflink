'use client'
import React, { useRef } from 'react'
import { Icons } from '@/components/Icons'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import animations from '@/lib/animations'
import { Features } from '@/lib/types'
import Image from 'next/image'

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/7t8nkPFGC0A
 */

export const features: Features[] = [
  {
    icon: <Icons.dollarSign />,
    title: 'Free Core Features',
    description: 'Create a page & manage your links for free within minutes!',
  },
  {
    icon: <Icons.phone />,
    title: 'Mobile Friendly',
    description: 'Easily access & manage your content both on desktop and mobile!',
  },
  {
    icon: <Icons.sparkles />,
    title: 'Beautiful Interface',
    description: 'A unique and yet simple user interface to help you manage your links and share them quickly.',
  },

  {
    icon: <Icons.instagram />,
    title: 'Showcase Your Socials',
    description: 'Display your social links in an elegant fashion at the bottom of your links list.',
  },
  {
    icon: <Icons.analytics />,
    title: 'Analytics Tools',
    description: 'Simple analytics tools to help you keep track of your stats.',
  },
  {
    icon: <Icons.link />,
    title: 'Short & Convienient URL',
    description: 'A unique, short & customizable URL to share with the world!',
  },
]

export default function AboutSection() {
  return (
    <motion.section variants={animations.featureTitle.parent} initial="hidden" animate="visible" className="w-full">
      <div className="flex flex-col items-center px-4 md:px-6 w-full mx-auto">
        <div className="grid grid-cols-1  md:grid-cols-2 items-center mb-8 w-full max-w-layout gap-12 px-6">
          <div>
            <motion.h2 variants={animations.featureTitle.child} className="typo-h1">
              About
            </motion.h2>
            <motion.p variants={animations.featureTitle.child} className="typo-p text-muted  max-w-optical mx-auto">
              Leaflink is a simple to use and easy link-in-bio application that allows you to create a personalized page
              with your most important links, so you can share them with the world more easily.
            </motion.p>
            <motion.p variants={animations.featureTitle.child} className="typo-p text-muted  max-w-optical mx-auto">
              Start today by creating your account, personalizing your url, and start sharing your creativity with the
              world!
            </motion.p>
            <Link href="/register" className={cn(buttonVariants({ variant: 'primary', size: 'sm' }), 'relative my-4')}>
              <Icons.sparkles />
              Create your Leaflink Page!
            </Link>
          </div>
          <Image
            alt="SaaS company background"
            className="rounded-xl object-cover object-center h-full"
            height="800"
            src="/images/hero-3.png"
            style={{
              aspectRatio: '1920/800',
              objectFit: 'cover',
            }}
            width="1920"
          />
        </div>
        <motion.div
          variants={animations.featureCards.parent}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        ></motion.div>
      </div>
    </motion.section>
  )
}
