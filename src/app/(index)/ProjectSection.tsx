/**
 * v0 by Vercel.
 * @see https://v0.dev/t/mQbRRRec1Dp
 */
import { Icons } from '@/components/Icons'
import { buttonVariants } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { SVGProps } from 'react'

export default function ProjectSection() {
  return (
    <section className="w-full">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
          <Image
            alt="SaaS company background"
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            height="800"
            src="/images/hero-3.png"
            style={{
              aspectRatio: '1920/800',
              objectFit: 'cover',
            }}
            width="1920"
          />
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm ">New Features</div>
              <h2 className="typo-h1">How can we grow?</h2>

              <p className="typo-p text-muted">
                Leaflink is constantly improving and growing. Let us know what you would like to see for the future of
                Leaflink!
              </p>
            </div>
            <ul className="grid gap-2 py-4 text-sm">
              <li>
                <Icons.check className="mr-2 inline-block h-4 w-4" />
                Make collaboration seamless with built-in code review tools.
              </li>
              <li>
                <Icons.check className="mr-2 inline-block h-4 w-4" />
                Automate your workflow with continuous integration and delivery.
              </li>
              <li>
                <Icons.check className="mr-2 inline-block h-4 w-4" />
                Deploy to the cloud with a single click and scale with ease.
              </li>
            </ul>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="https://github.com/ElvannAbendroth/leaflink"
                target="_blank"
                className={cn(buttonVariants({ variant: 'default', size: 'sm' }), '')}
              >
                <Icons.gitHub />
                See Project On Github
              </Link>
              <Link
                href="https://ko-fi.com/elvann"
                target="_blank"
                className={cn(buttonVariants({ variant: 'subtle', size: 'sm' }), '')}
              >
                <Icons.heart />
                Support the Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
