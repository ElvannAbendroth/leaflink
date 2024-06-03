'use client'
import React, { useRef } from 'react'
import { Icons } from '@/components/Icons'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/Button'
import { motion } from 'framer-motion'
import animations from '@/lib/animations'
import { Features } from '@/lib/types'

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

export default function FeatureSection() {
  return (
    <motion.section variants={animations.featureTitle.parent} initial="hidden" animate="visible" className="w-full">
      <div className="container px-4 md:px-6 w-full max-w-layout mx-auto">
        <div className="text-center mb-8 w-full">
          <motion.h2 variants={animations.featureTitle.child} className="typo-h1">
            Key Features
          </motion.h2>
          <motion.p variants={animations.featureTitle.child} className="typo-p text-muted">
            Explore the powerful features that enable you to build your website quickly and easily.
          </motion.p>
        </div>
        <motion.div
          variants={animations.featureCards.parent}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {features.map((feature, i) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </motion.div>

        <div className="py-12 mx-auto max-w-sm">
          <Link
            href="https://github.com/ElvannAbendroth/leaflink"
            target="_blank"
            className={cn(buttonVariants({ variant: 'default' }), '')}
          >
            <Icons.gitHub />
            See Project On Github
          </Link>
          {/* <Link
              href="https://ko-fi.com/elvann"
              target="_blank"
              className={cn(buttonVariants({ variant: 'subtle', size: 'sm' }), '')}
            >
              <Icons.heart />
              Support the Project
            </Link> */}
        </div>
      </div>
    </motion.section>
  )
}

type FeatureCardProps = {
  icon: React.ReactNode
  title: string
  description: string
  variants?: object
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      variants={animations.featureCards.child}
      className="flex flex-col items-center text-center py-8 px-3 rounded-lg border border-input"
    >
      <motion.div whileHover={{ rotate: 15, scale: 1.2 }} transition={{ ease: 'anticipate', duration: 0.75 }}>
        {React.cloneElement(icon as React.ReactElement, {
          className: 'h-12 w-12 mb-4 text-primary',
        })}
      </motion.div>
      <h3 className="text-lg font-bold mb-2 ">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </motion.div>
  )
}
