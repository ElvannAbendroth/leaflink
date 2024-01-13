import React from 'react'
import { Icons } from './Icons'

/**
 * v0 by Vercel.
 * @see https://v0.dev/t/7t8nkPFGC0A
 */

type Features = {
  icon: React.ReactNode
  title: string
  description: string
}

const features: Features[] = [
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
    <section className="w-full py-12 md:py-24 lg:py-32 ">
      <div className="container px-4 md:px-6 w-full mx-auto">
        <div className="text-center mb-8 w-full">
          <h2 className="typo-h1">Key Features</h2>
          <p className="typo-p text-muted">
            Explore the powerful features that enable you to build your website quickly and easily.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map(feature => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

type FeatureCardProps = {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      {React.cloneElement(icon as React.ReactElement, {
        className: 'h-12 w-12 mb-4',
      })}
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
    </div>
  )
}
